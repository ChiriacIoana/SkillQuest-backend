import { Controller, Get, Param } from '@nestjs/common';
import { AchievementsService } from './achievements.service';

@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get('user/:userId')
  async getUserAchievements(@Param('userId') userId: string) {
    return this.achievementsService.getUserAchievements(Number(userId));
  }

  @Get('all')
  async getAllAchievements() {
    return this.achievementsService.getAllAchievements();
  }
}