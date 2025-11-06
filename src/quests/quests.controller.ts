import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { QuestsService } from './quests.service';

@Controller('quests')
export class QuestsController {
  constructor(private readonly questsService: QuestsService) {}

  @Get(':userId')
  async getUserQuests(@Param('userId') userId: string) {
    return this.questsService.getRecommendedQuests(Number(userId));
  }

  @Post()
  async createQuest(
    @Body() body: { userId: number; questName: string; xp: number },
  ) {
    const { userId, questName, xp } = body;
    return this.questsService.createQuest(userId, questName, xp);
  }

  @Patch(':userId/:questId/complete')
  async completeQuest(
    @Param('userId') userId: string,
    @Param('questId') questId: string,
  ) {
    return this.questsService.completeQuest(Number(userId), Number(questId));
  }

  @Delete(':id')
  async deleteQuest(@Param('id') id: string) {
    return this.questsService.deleteQuest(Number(id));
  }
}
