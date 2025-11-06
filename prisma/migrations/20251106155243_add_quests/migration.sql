-- AlterTable
ALTER TABLE "User" ADD COLUMN     "completedQuests" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "currentXP" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "nextLevelXP" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "streak" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Quest" (
    "questId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "xp" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("questId")
);

-- CreateTable
CREATE TABLE "UserQuest" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "questId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "UserQuest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserQuest_userId_questId_key" ON "UserQuest"("userId", "questId");

-- AddForeignKey
ALTER TABLE "UserQuest" ADD CONSTRAINT "UserQuest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuest" ADD CONSTRAINT "UserQuest_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("questId") ON DELETE RESTRICT ON UPDATE CASCADE;
