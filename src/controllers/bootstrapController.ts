
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { QuizApiService } from 'src/services/external.quizapi.service';

@Controller('bootstrap')
export class BootstrapController {
  constructor(
    private readonly quizApiService: QuizApiService,
     private readonly prisma: PrismaService
) {}

  @Post('seed-questions')
  async seedQuestions(@Body() body: any, @Res() res: Response) {
    try {
      const { category = 'code', limit=10 } = body;
      const questions = await this.quizApiService.fetchQuestions(category, limit);

      if (!questions || !questions.length) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: `No questions found for ${category}` });
      }

      console.log("Preparing to insert", questions.length, "questions");

      const savedQuestions = await (this.prisma as any).quizQuestion.createMany({
        data: questions.map((q: any) => ({
          externalId: q.id?.toString(),
          source: 'quizapi',
          category: q.category || category,
          difficulty: q.difficulty || 'Medium',
          question: q.question,
          answersJson: JSON.stringify(q.answers),
          correctIndex: null, 
          xp: 50,
        })),
        skipDuplicates: true, 
      });

      console.log(`Saved ${savedQuestions.count} questions to DB`);

       return res.status(HttpStatus.CREATED).json({
        message: `${savedQuestions.count} questions saved successfully!`,
        category,
      });
    } catch (err: any) {
      console.error('Error seeding questions:', err.message);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }
}
