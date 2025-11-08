import axios from "axios";
import { PrismaClient } from "@prisma/client";
import type { Quest } from "@prisma/client";

const prisma = new PrismaClient();

const QUIZ_API_URL = process.env.QUIZ_API_URL || "https://quizapi.io/api/v1/";
const QUIZ_API_KEY = process.env.QUIZ_API_KEY; 

const headers = {
  "X-Api-Key": QUIZ_API_KEY,
};

export type QuizApiQuestion = {
  id?: string;
  question: string;
  answers: Record<string, string | null>;
  correct_answer?: string | null;
  category?: string;
  difficulty?: string;
};

export const getCategories = async () => {
  const { data } = await axios.get(`${QUIZ_API_URL}/categories`, { headers });
  return data;
};

export const getTags = async () => {
  const { data } = await axios.get(`${QUIZ_API_URL}/tags`, { headers });
  return data;
};

export const getQuestions = async (
    category: string, 
    limit = 10, 
    difficulty = "Medium"
): Promise<QuizApiQuestion[]> => {
  const { data } = await axios.get(`${QUIZ_API_URL}/questions`, {
    headers,
    params: {
      category,
      limit,
      difficulty,
    },
  });
  return data;
};

export const saveQuestions = async (questions: QuizApiQuestion[]) => {
  const savedQuestions: Quest[] = [];

  for (const q of questions) {
    const newQuestion = await prisma.quest.create({
      data: {
        questName: q.question,
        description: JSON.stringify(q.answers),
        xp: 10, //changee
        category: q.category || 'General',
        isActive: true,
      },
    });
    savedQuestions.push(newQuestion);
  }

  return savedQuestions;
};