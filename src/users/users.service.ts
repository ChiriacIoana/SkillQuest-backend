import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserStats(userId: number) {
    return this.prisma.user.findUnique({
        where: { userId },
        select: {
            username: true,
            level: true,
            currentXP: true,
            nextLevelXP: true,
            completedQuests: true,
            streak: true,
        },
    });
  }

  async findUserByName(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async getUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: { userId },
    });
  }

  async createUser(username: string, password: string): Promise<User> {
    return this.prisma.user.create({
      data: { username, password },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
