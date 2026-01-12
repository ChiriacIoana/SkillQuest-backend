import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { QuestsModule } from './quests/quests.module';
import { BootstrapController } from './controllers/bootstrapController';
import { QuizApiService } from './services/external.quizapi.service';
import { AchievementsModule } from './achievements/achievements.module';
import { LocalStorageModule } from './config/local-storage-module';
import { APP_GUARD } from '@nestjs/core/constants';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';
import { UserTypeModule } from './userType/userType.module';
import { HintModule} from './analyze/hint.module';

@Module({
	imports: [
		LocalStorageModule,
		PrismaModule,
		UsersModule,
		AuthModule,
		QuestsModule,
		AchievementsModule,
		UserTypeModule,
		HintModule
	],
	controllers: [BootstrapController],
	providers: [
		QuizApiService,
		{
			provide: APP_GUARD,
			useClass: AuthenticatedGuard
		}
	]
})
export class AppModule {}
