import { Module } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { QuestsController } from './quests.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'prisma/prisma.service';
import { AchievementsModule } from 'src/achievements/achievements.module';

@Module({
  imports: [PrismaModule, UsersModule, AchievementsModule],
  providers: [QuestsService, PrismaService],
  controllers: [QuestsController],
  exports: [QuestsService],
})
export class QuestsModule {}