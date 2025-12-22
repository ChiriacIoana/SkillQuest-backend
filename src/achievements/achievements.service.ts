import { Injectable } from '@nestjs/common';
import { CommonService } from '../common/services/common.service';

@Injectable()
export class AchievementsService extends CommonService {
	async checkAndUnlockAchievements(userId: number): Promise<any[]> {
		const user = await this.prisma.user.findUnique({
			where: { userId },
			include: {
				userQuests: { where: { completed: true } },
				achievements: { include: { achievement: true } }
			}
		});

		if (!user) return [];

		const completedQuestsCount = await this.prisma.userQuest.count({
			where: { userId, completed: true }
		});
		const totalXP = user.currentXP ?? 0;
		const unlockedAchievementIds = user.achievements.map(
			(a) => a.achievementId
		);

		const availableAchievements = await this.prisma.achievement.findMany({
			where: {
				id: { notIn: unlockedAchievementIds }
			}
		});

		const newlyUnlocked = [];

		for (const achievement of availableAchievements) {
			let shouldUnlock = false;

			if (achievement.category === 'xp' 
				&& achievement.xpRequired !==null
			) {
				shouldUnlock = totalXP >= achievement.xpRequired;
			}

			if (achievement.category === 'quests' 
				&& achievement.questsRequired !==null
			) {
				shouldUnlock = completedQuestsCount >= achievement.questsRequired;
			}

			if (shouldUnlock) {
				await this.prisma.userAchievement.create({
					data: {
						userId,
						achievementId: achievement.id
					}
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
			orderBy: {
				achievement: {
					category: 'asc'
			}
}
		});
	}

	async getAllAchievements() {
		return this.prisma.achievement.findMany({
			orderBy: { xpRequired: 'asc' }
		});
	}
}
