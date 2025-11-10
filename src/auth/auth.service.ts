import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { BcryptUtils } from 'src/common/utils/bcrypt.utils';


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) {}

    async validateUser(loginDto: LoginDto) {
        const user = await this.userService.findUserByName(loginDto.username);

         if(!user || !await BcryptUtils.comparePasswords(loginDto.password, user.password)) {
            throw new UnauthorizedException();
        }

        const tokenPayload = {
            sub: user.userId,
            username: user.username,
        };

        const accessToken  = await this.jwtService.signAsync(tokenPayload);
        return {accessToken, username: user.username, userId: user.userId};

    }
      async register(registerDto: RegisterDto): Promise<User> {
        return this.prisma.user.create({
          data: {
            username: registerDto.username,
            password: await BcryptUtils.hashPassword(registerDto.password),
          }
        });
      }


    async getUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: { userId },
    });
}

}
