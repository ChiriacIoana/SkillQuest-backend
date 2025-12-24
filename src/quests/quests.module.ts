import { Module } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { QuestsController } from './quests.controller';
import { UsersModule } from 'src/users/users.module';
import { AchievementsModule } from 'src/achievements/achievements.module';
import { QuizApiModule } from 'src/services/quizapi.module';

@Module({
	imports: [UsersModule, AchievementsModule, QuizApiModule],
	providers: [QuestsService],
	controllers: [QuestsController],
	exports: [QuestsService]
})
export class QuestsModule {}
