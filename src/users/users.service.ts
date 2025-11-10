import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/services/common.service';

@Injectable()
export class UsersService extends CommonService {
	async getUserStats(userId: number) {
		return this.prisma.user.findUnique({
			where: { userId },
			select: {
				username: true,
				level: true,
				currentXP: true,
				nextLevelXP: true,
				completedQuests: true,
				streak: true
			}
		});
	}

	async findUserByName(username: string) {
		return this.prisma.user.findUnique({
			where: { username }
		});
	}

	async getUserById(userId: number) {
		return this.prisma.user.findUnique({
			where: { userId }
		});
	}

	async getAllUsers() {
		return this.prisma.user.findMany();
	}

	async newServ() {
		this.userID;
	}
}
