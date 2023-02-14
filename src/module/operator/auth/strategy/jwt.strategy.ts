import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { OpeAuthService } from '../auth.service';
import {
  AuthManagerStrategy,
  Payload,
} from 'src/module/core/auth/model/auth.model';
import { getConfig } from 'src/shared/lib/config.lib';

@Injectable()
export class JwtManagerStrategy extends PassportStrategy(
  Strategy,
  AuthManagerStrategy.JWT,
) {
  constructor(private authService: OpeAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: getConfig('jwt.secret'),
    });
  }

  async validate(payload: Payload) {
    return await this.authService.validateByToken(payload.id);
  }
}
