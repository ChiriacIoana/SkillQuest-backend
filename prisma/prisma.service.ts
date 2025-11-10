import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	async onModuleInit() {
		await this.$connect();
		console.log('Connected to PostgreSQL via Prisma');
	}

	async onModuleDestroy() {
		console.log('Disconnected from PostgreSQL via Prisma');
		await this.$disconnect();
	}
}
