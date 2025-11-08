-- CreateTable
CREATE TABLE "QuizQuestion" (
    "id" SERIAL NOT NULL,
    "externalId" TEXT,
    "source" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "difficulty" TEXT,
    "question" TEXT NOT NULL,
    "answersJson" TEXT NOT NULL,
    "correctIndex" INTEGER,
    "xp" INTEGER NOT NULL DEFAULT 50,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuizQuestion_externalId_key" ON "QuizQuestion"("externalId");
