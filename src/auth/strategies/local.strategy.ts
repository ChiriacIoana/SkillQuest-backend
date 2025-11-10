import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    });
  }

  async validate(
    _req: Request,
    username: string,
    password: string
  ): Promise<{
    accessToken: string;
  }> {
    return this.authService.validateUser({username, password});
  }
}