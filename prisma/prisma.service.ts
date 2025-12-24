import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{

	constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    super({
      adapter: new PrismaPg(pool),
    });
  }

	async onModuleInit() {
		await this.$connect();
		console.log('Connected to PostgreSQL via Prisma');
	}

	async onModuleDestroy() {
		console.log('Disconnected from PostgreSQL via Prisma');
		await this.$disconnect();
	}
}
