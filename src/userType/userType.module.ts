import { Module } from '@nestjs/common';
import { userTypeController } from './userType.controller';
import { UserTypeService } from './userType.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
    controllers: [userTypeController],
    providers: [UserTypeService],
    exports: [UserTypeService]
})
export class UserTypeModule {}
    