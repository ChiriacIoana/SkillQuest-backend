import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { AuthGuard } from './auth/guards/auth.guards';

type AuthInput = { username: string; password: string };

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('auth/register')
  async register(@Body() input: AuthInput) {
    const user = await this.usersService.createUser(input.username, input.password);
    return { userId: user.userId, username: user.username };
  }

  @Post('auth/login')
  async login(@Body() input: AuthInput) {
    return this.authService.authenticate(input); 
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user;
  }
}
