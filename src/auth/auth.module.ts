import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

const JWT_SECRET = process.env.JWT_SECRET ?? 'default_jwt';

@Module({
	providers: [AuthService, JwtStrategy, LocalStrategy],
	controllers: [AuthController],
	imports: [
		UsersModule,
		JwtModule.register({
			global: true,
			secret: JWT_SECRET
		}),
		PassportModule
	],
	exports: [AuthService]
})
export class AuthModule {}
