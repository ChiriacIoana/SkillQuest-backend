import { Inject } from '@nestjs/common';
import { ClsService, ClsStore } from 'nestjs-cls';
import { PrismaService } from '../../../prisma/prisma.service';

export interface CustomClsStore extends ClsStore {
	userID: number;
}

export abstract class CommonService {
	@Inject('DB')
	protected readonly prisma: PrismaService;

	@Inject()
	private readonly clsService: ClsService<CustomClsStore>;

	protected get userID(): number {
		return this.clsService.get('userID');
	}
}
