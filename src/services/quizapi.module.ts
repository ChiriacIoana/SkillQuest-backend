import { Module } from '@nestjs/common';
import { QuizApiService } from './quizapi.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [QuizApiService, PrismaService],
  exports: [QuizApiService],
})
export class QuizApiModule {}
