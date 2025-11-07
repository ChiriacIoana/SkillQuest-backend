import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@Req() req: any) {
    const userId = req.user.sub; 
    return this.usersService.getUserStats(userId);
  }
  @Get(':id')
async getUserById(@Param('id') id: string) {
  const userId = parseInt(id, 10);
  return this.usersService.getUserStats(userId); 
}
}
  