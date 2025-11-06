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

  async findUserByName(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
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
