-- AlterTable
ALTER TABLE "User" ADD COLUMN     "coderTypeId" BIGINT;

-- CreateTable
CREATE TABLE "UserType" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "min_xp" DECIMAL,
    "max_xp" DECIMAL,
    "min_quizzes" DECIMAL,
    "description" TEXT,

    CONSTRAINT "UserType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_coderTypeId_fkey" FOREIGN KEY ("coderTypeId") REFERENCES "UserType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
