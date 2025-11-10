import {
	Injectable,
	InternalServerErrorException,
	UnauthorizedException
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { BcryptUtils } from 'src/common/utils/bcrypt.utils';
import { CommonService } from 'src/common/services/common.service';

@Injectable()
export class AuthService extends CommonService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService
	) {
		super();
	}

	async validateUser(loginDto: LoginDto) {
		const user = await this.userService.findUserByName(loginDto.username);

		if (
			!user ||
			!(await BcryptUtils.comparePasswords(loginDto.password, user.password))
		) {
			throw new UnauthorizedException();
		}

		const tokenPayload = {
			userId: user.userId,
			username: user.username
		};

		const accessToken = await this.jwtService.signAsync(tokenPayload);
		return { accessToken, userId: user.userId };
	}
	async register(registerDto: RegisterDto) {
		try {
			await this.prisma.user.create({
				data: {
					username: registerDto.username,
					password: await BcryptUtils.hashPassword(registerDto.password)
				},
				select: {
					userId: true
				}
			});
		} catch (err) {
			if (err.code === 'P2002') {
				throw new UnauthorizedException('Username already exists');
			} else {
				throw new InternalServerErrorException();
			}
		}
	}
}
