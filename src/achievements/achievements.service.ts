import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AchievementsService {
  constructor(private prisma: PrismaService) {}

  async checkAndUnlockAchievements(userId: number): Promise<any[]> {
    const user = await this.prisma.user.findFirst({
      where: { id: userId } as any,
      include: {
        userQuests: { where: { completed: true } },
        achievements: { include: { achievement: true } },
      },
    });

    if (!user) return [];

    const completedQuestsCount =
      typeof (user as any).completedQuests === 'number'
        ? (user as any).completedQuests
        : (Array.isArray((user as any).userQuests) ? (user as any).userQuests.length : 0);
    const totalXP = (user as any).xp ?? (user as any).currentXP ?? 0;
    const unlockedAchievementIds = Array.isArray((user as any).achievements)
      ? (user as any).achievements.map((a: any) => a.achievementId)
      : [];

    const availableAchievements = await this.prisma.achievement.findMany({
      where: {
        id: { notIn: unlockedAchievementIds },
      },
    });

    const newlyUnlocked: any[] = [];

    for (const achievement of availableAchievements) {
      let shouldUnlock = false;

      if (achievement.category === 'xp' && achievement.xpRequired) {
        shouldUnlock = totalXP >= achievement.xpRequired;
      }

      if (achievement.category === 'quests' && achievement.questsRequired) {
        shouldUnlock = completedQuestsCount >= achievement.questsRequired;
      }

      if (shouldUnlock) {
        await this.prisma.userAchievement.create({
          data: {
            userId,
            achievementId: achievement.id,
          },
        });
        newlyUnlocked.push(achievement);
      }
    }

    return newlyUnlocked;
  }

  async getUserAchievements(userId: number) {
    return this.prisma.userAchievement.findMany({
      where: { userId },
      include: { achievement: true },
      orderBy: { unlockedAt: 'desc' },
    });
  }

  async getAllAchievements() {
    return this.prisma.achievement.findMany({
      orderBy: { xpRequired: 'asc' },
    });
  }
}