import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AchievementsService } from '../achievements/achievements.service';

@Injectable()
export class QuestsService {
  constructor(
    private prisma: PrismaService,
    private achievementsService: AchievementsService,
) {}


  async getQuestById(questId: number) {
  return this.prisma.quest.findUnique({
    where: { questId },
  });
}


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

  async createQuest(userId: number, questName: string, xp: number, category: string) {
  const quest = await this.prisma.quest.create({
    data: { 
      questName, 
      xp,
      description: null
    },
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
    const newAchievements = await this.achievementsService.checkAndUnlockAchievements(userId);

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

    return {
      userQuest,
      newAchievements,
    };
  }

async getQuestsByCategory(category: string) {
  const quests = await this.prisma.quest.findMany({
    where: {
      isActive: true,
      category: category,
    },
  });
  return quests;
}

async getQuestByCategoryAndId(category: string, questId: number) {
  const quest = await this.prisma.quest.findUnique({
    where: { questId },
  });

  if (!quest || !quest.isActive) return null;
  if ((quest as any).category !== category) return null;

  return quest;
}
  async deleteQuest(id: number) {
    return this.prisma.userQuest.delete({
      where: { id },
    });
  }
  }