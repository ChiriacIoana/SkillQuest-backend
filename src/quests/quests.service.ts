import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestsService {
  constructor(private prisma: PrismaService) {}

  async getCompletedQuests(userId: number) {
    return this.prisma.userQuest.findMany({
      where: { userId, completed: true },
      include: { quest: true },
    });
  }

  async getRecommendedQuests(userId: number) {
    return this.prisma.quest.findMany({
      where: {
        isActive: true,
        NOT: {
          userQuests: {
            some: {
              userId,
              completed: true,
            },
          },
        },
      },
    });
  }

  async createQuest(userId: number, questName: string, xp: number) {
   
    const quest = await this.prisma.quest.create({
      data: { questName, xp },
    });

    return this.prisma.userQuest.create({
      data: {
        userId,
        questId: quest.questId,
      },
    });
  }

  async completeQuest(userId: number, questId: number) {
    const userQuest = await this.prisma.userQuest.upsert({
      where: { userId_questId: { userId, questId } },
      update: { completed: true, completedAt: new Date() },
      create: { userId, questId, completed: true, completedAt: new Date() },
    });

    const quest = await this.prisma.quest.findUnique({ where: { questId } });
    const user = await this.prisma.user.findUnique({ where: { userId } });

    if (quest && user) {
      let newXP = user.currentXP + quest.xp;
      let newLevel = user.level;
      let nextLevelXP = user.nextLevelXP;

      while (newXP >= nextLevelXP) {
        newXP -= nextLevelXP;
        newLevel++;
        nextLevelXP = Math.floor(nextLevelXP * 1.2);
      }

      await this.prisma.user.update({
        where: { userId },
        data: {
          currentXP: newXP,
          level: newLevel,
          nextLevelXP,
          completedQuests: { increment: 1 },
        },
      });
    }

    return userQuest;
  }

  async deleteQuest(id: number) {
    return this.prisma.userQuest.delete({
      where: { id },
    });
  }
}
