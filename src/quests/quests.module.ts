import { Module } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { QuestsController } from './quests.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [PrismaModule, UsersModule],
  providers: [QuestsService, PrismaService],
  controllers: [QuestsController],
  exports: [QuestsService],
})
export class QuestsModule {}