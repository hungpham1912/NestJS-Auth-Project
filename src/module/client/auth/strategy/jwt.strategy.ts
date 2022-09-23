import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { CliAuthService } from '../auth.service';
import { Payload } from '../models/auth.model';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'jwt_user') {
  constructor(private authService: CliAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(payload: Payload) {
    return await this.authService.validateByToken(payload.id);
  }
}
