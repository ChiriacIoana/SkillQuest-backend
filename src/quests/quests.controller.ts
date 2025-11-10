import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { QuestsService } from './quests.service';
import {
  getQuestions,
  saveQuestions,


} from 'src/services/quizapi.service';
import { PrismaService } from 'prisma/prisma.service';

@Controller('quests')
export class QuestsController {
  constructor(
    private readonly questsService: QuestsService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('seed-questions')
  async seedQuestions(@Body() body: { category: string }) {
    console.log('questionn:', body.category);
    const questions = await getQuestions(body.category, 10);
    console.log('Fetched questions:', questions);
    const saved = await saveQuestions(questions);
    return saved;
  }

  @Post()
  async createQuest(
    @Body()
    body: {
      userId: number;
      questName: string;
      xp: number;
      category: string;
    },
  ) {
    const { userId, questName, xp, category } = body;
    return this.questsService.createQuest(userId, questName, xp, category);
  }

  @Patch(':questId/assign-questions')
  async assignQuestionsToQuest(
    @Param('questId') questId: string,
    @Body() body: { questionIds: number[] },
  ) {
    const { questionIds } = body;

    const updatedQuest = await this.prisma.quest.update({
      where: { questId: Number(questId) },
      data: { questionIds },
    });

    return updatedQuest;
  }

  @Patch(':userId/:questId/complete')
  async completeQuest(
    @Param('userId') userId: string,
    @Param('questId') questId: string,
  ) {
    return this.questsService.completeQuest(Number(userId), Number(questId));
  }

  @Delete(':questId')
  async deleteQuest(@Param('questId') questId: string) {
    return this.questsService.deleteQuest(Number(questId));
  }

  ///delete this later
  @Get('debug/html-question-ids')
async getHtmlQuestionIds() {
  const questions = await this.prisma.quizQuestion.findMany({
    where: { category: 'HTML' },
    select: { id: true, question: true },
    orderBy: { id: 'asc' },
  });

  return {
    count: questions.length,
    ids: questions.map(q => q.id),
    questions: questions,
  };
}

///this too
@Get('debug/quest/:questId')
async debugQuest(@Param('questId') questId: string) {
  const quest = await this.prisma.quest.findUnique({
    where: { questId: Number(questId) },
  });

  if (!quest) return { error: 'Quest not found' };

  const questions = await this.prisma.quizQuestion.findMany({
    where: { 
      id: { in: quest.questionIds || [] },
    },
  });

  return {
    quest,
    questionIdsInQuest: quest.questionIds,
    questionsFound: questions,
    questionsFoundCount: questions.length,
  };
}

  @Get('debug/check-questions')
  async checkQuestions() {
    const allQuestions = await this.prisma.quizQuestion.findMany({
      select: { id: true, question: true, category: true },
      orderBy: { id: 'asc' },
    });

    return {
      totalQuestions: allQuestions.length,
      questions: allQuestions,
      htmlQuestions: allQuestions.filter((q) => q.category === 'HTML'),
    };
  }

  @Get('category/:category/:questId/questions')
  async getQuestions(
    @Param('category') category: string,
    @Param('questId') questId: string,
  ) {
    console.log('getQuestions called with:', { category, questId });

    const quest = await this.prisma.quest.findUnique({
      where: { questId: Number(questId) },
      select: { questionIds: true },
    });

    if (!quest || !quest.questionIds || quest.questionIds.length === 0) {
      console.log('No questions assigned to quest', questId);
      return [];
    }

    console.log('Question IDs for this quest:', quest.questionIds);

    const questions = await this.prisma.quizQuestion.findMany({
      where: {
        id: { in: quest.questionIds },
      },
    });

    console.log('Found questions:', questions.length);

     const processedQuestions = questions.map(q => {
    if (q.answersJson) {
      const answers = JSON.parse(q.answersJson);
      const answerEntries = Object.entries(answers).slice(0, 4);
      const limitedAnswers = Object.fromEntries(answerEntries);

      return {
        ...q,
        answersJson: JSON.stringify(limitedAnswers)
      };
    }
    return q;
  });

    const orderedQuestions = quest.questionIds
      .map((id) => processedQuestions.find((q) => q.id === id))
      .filter((q) => q !== undefined);

    return orderedQuestions;
  }

  @Get('category/:category/:questId')
  async getQuestByCategoryAndId(
    @Param('category') category: string,
    @Param('questId') questId: string,
  ) {
    console.log('Hit getQuestByCategoryAndId', category, questId);
    return this.questsService.getQuestByCategoryAndId(
      category,
      Number(questId),
    );
  }

  @Get('category/:category')
  async getQuestsByCategory(@Param('category') category: string) {
    const data = await this.questsService.getQuestsByCategory(category);

    return data;
  }

  @Get('details/:questId')
  async getQuestById(@Param('questId') questId: string) {
    return this.questsService.getQuestById(Number(questId));
  }
  @Get(':userId')
  async getUserQuests(@Param('userId') userId: string) {
    return this.questsService.getRecommendedQuests(Number(userId));
  }
}