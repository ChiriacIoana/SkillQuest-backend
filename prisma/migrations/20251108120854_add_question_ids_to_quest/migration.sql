-- AlterTable
ALTER TABLE "Quest" ADD COLUMN     "questionIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
