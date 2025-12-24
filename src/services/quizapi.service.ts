import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../../prisma/prisma.service';
import type { Quest } from '@prisma/client';

const QUIZ_API_URL = process.env.QUIZ_API_URL || 'https://quizapi.io/api/v1';
const QUIZ_API_KEY = process.env.QUIZ_API_KEY;

const headers = {
  'X-Api-Key': QUIZ_API_KEY,
};

export type QuizApiQuestion = {
  id?: string;
  question: string;
  answers: Record<string, string | null>;
  correct_answer?: string | null;
  category?: string;
  difficulty?: string;
};

@Injectable()
export class QuizApiService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategories() {
    const { data } = await axios.get(`${QUIZ_API_URL}/categories`, { headers });
    return data;
  }

  async getTags() {
    const { data } = await axios.get(`${QUIZ_API_URL}/tags`, { headers });
    return data;
  }

  async getQuestions(
    category: string,
    limit = 10,
    difficulty = 'Medium',
  ): Promise<QuizApiQuestion[]> {
    const { data } = await axios.get(`${QUIZ_API_URL}/questions`, {
      headers,
      params: { category, limit, difficulty },
    });
    return data;
  }

  async saveQuestions(questions: QuizApiQuestion[]): Promise<Quest[]> {
    const savedQuestions: Quest[] = [];

    for (const q of questions) {
      const newQuestion = await this.prisma.quest.create({
        data: {
          questName: q.question,
          description: JSON.stringify(q.answers),
          xp: 10,
          category: q.category || 'General',
          isActive: true,
        },
      });

      savedQuestions.push(newQuestion);
    }

    return savedQuestions;
  }
}
