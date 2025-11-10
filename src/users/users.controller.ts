import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get('me')
	async getMe() {
		return this.usersService.getUserStats();
	}

	@Get(':id')
	async getUserById(@Param('id') id: string) {
		return this.usersService.getUserStats(+id);
	}
}
