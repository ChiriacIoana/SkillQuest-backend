import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { getQuestions, saveQuestions, getCategories, getTags } from 'src/services/quizapi.service';


@Controller('quests')
export class QuestsController {
  constructor(
    private readonly questsService: QuestsService,
  ) {}

@Get('category/:category/:questId')
async getQuestByCategoryAndId(
  @Param('category') category: string,
  @Param('questId') questId: string
) {
  console.log('Hit getQuestByCategoryAndId', category, questId);
  return this.questsService.getQuestByCategoryAndId(category, Number(questId));
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

 @Post()
async createQuest(@Body() body: { userId: number; questName: string; xp: number; category: string }) {
  const { userId, questName, xp, category } = body;
  return this.questsService.createQuest(userId, questName, xp, category);
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

  @Post('seed-questions')
async seedQuestions(@Body() body: { category: string }) {
   console.log('questionn:', body.category);
  const questions = await getQuestions(body.category, 10);
  console.log('fetched questions:', questions);
  const saved = await saveQuestions(questions);
  return saved;
}

@Post('test')
testRoute(@Body() body: any) {
  console.log('Test route hit with body:', body);
  return { ok: true, body };
}

}