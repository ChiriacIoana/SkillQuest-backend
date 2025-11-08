import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { User } from './users/users.entity';
import { ConfigModule } from '@nestjs/config';
import { QuestsModule } from './quests/quests.module';
import { BootstrapController } from './controllers/bootstrapController';
import { QuizApiService } from './services/external.quizapi.service';
import { AchievementsModule } from './achievements/achievements.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule, 
    AuthModule,
    PrismaModule,
    QuestsModule,
    AchievementsModule,
  ],
  controllers: [
    AppController,
    BootstrapController,
  ],
  providers: [
    AppService,
    QuizApiService,
  ],
})
export class AppModule {}
