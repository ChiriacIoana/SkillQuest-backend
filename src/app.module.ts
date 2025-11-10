import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { QuestsModule } from './quests/quests.module';
import { BootstrapController } from './controllers/bootstrapController';
import { QuizApiService } from './services/external.quizapi.service';
import { AchievementsModule } from './achievements/achievements.module';
import { LocalStorageModule } from './config/local-storage-module';

@Module({
	imports: [
		LocalStorageModule,
		PrismaModule,
		UsersModule,
		AuthModule,
		QuestsModule,
		AchievementsModule
	],
	controllers: [BootstrapController],
	providers: [QuizApiService]
})
export class AppModule {}
