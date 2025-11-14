import { Injectable } from '@nestjs/common';
import { AchievementsService } from '../achievements/achievements.service';
import { CommonService } from 'src/common/services/common.service';

@Injectable()
export class QuestsService extends CommonService {
	constructor(private achievementsService: AchievementsService) {
		super();
	}

	async getQuestById(questId: number) {
		return this.prisma.quest.findUnique({
			where: { questId }
		});
	}

	async getCompletedQuests(userId: number) {
		return this.prisma.userQuest.findMany({
			where: { userId, completed: true },
			include: { quest: true }
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
							completed: true
						}
					}
				}
			}
		});
	}

	async createQuest(
		userId: number,
		questName: string,
		xp: number,
		category: string
	) {
		const quest = await this.prisma.quest.create({
			data: {
				questName,
				xp,
				description: null
			}
		});

		return this.prisma.userQuest.create({
			data: {
				userId,
				questId: quest.questId
			}
		});
	}

	async completeQuest(userId: number, questId: number) {
		try {
			console.log('COMPLETE QUEST HIT', { userId, questId });

			const quest = await this.prisma.quest.findUnique({ where: { questId } });
			if (!quest) throw new Error(`Quest ${questId} not found`);

			const userQuest = await this.prisma.userQuest.upsert({
				where: { userId_questId: { userId, questId } },
				update: { completed: true, completedAt: new Date() },
				create: { userId, questId, completed: true }
			});

			const updatedUser = await this.prisma.user.update({
				where: { userId },
				data: {
					currentXP: { increment: quest.xp ?? 0 },
					completedQuests: { increment: 1 }
				}
			});

			console.log('AFTER UPDATE:', updatedUser);

			return { success: true, updatedUser };
		} catch (err) {
			console.error('ERROR in completeQuest:', err);
			throw err;
		}
	}

	async getQuestsByCategory(category: string) {
		const quests = await this.prisma.quest.findMany({
			where: {
				isActive: true,
				category: category
			}
		});
		return quests;
	}

	async getQuestByCategoryAndId(category: string, questId: number) {
		const quest = await this.prisma.quest.findUnique({
			where: { questId }
		});

		if (!quest || !quest.isActive) return null;
		if ((quest as any).category !== category) return null;

		return quest;
	}
	async deleteQuest(id: number) {
		return this.prisma.userQuest.delete({
			where: { id }
		});
	}
}
