import { Module } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { QuestsController } from './quests.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  providers: [QuestsService],
  controllers: [QuestsController],
})
export class QuestsModule {}
