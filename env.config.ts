import { config } from 'dotenv';

config();

const env = process.env;

export default {
  JWT_SECRET: env.JWT_SECRET!,
  PORT : env.PORT || 3000,
  DATABASE_URL: env.DATABASE_URL!,
  SUPABASE_DATABASE_URL: env.SUPABASE_DATABASE_URL!,
  HOST: env.HOST!,
  QUIZ_API_KEY: env.QUIZ_API_KEY!,
  QUIZAPI_BASE: env.QUIZAPI_BASE!
};