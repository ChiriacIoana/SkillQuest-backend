import { Controller, Get, Req, UseGuards } from '@nestjs/common';
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
}
