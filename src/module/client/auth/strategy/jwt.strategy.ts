import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { CliAuthService } from '../auth.service';
import {
  AuthUserStrategy,
  Payload,
} from 'src/module/core/auth/models/auth.model';
import { ENV_CONFIG } from 'src/shared/constants/env.constant';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(
  Strategy,
  AuthUserStrategy.JWT,
) {
  constructor(private authService: CliAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: ENV_CONFIG.jwt.secret,
    });
  }

  async validate(payload: Payload) {
    return await this.authService.validateByToken(payload.id);
  }
}
