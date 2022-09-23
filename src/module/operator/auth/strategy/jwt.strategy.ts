import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { OpeAuthService } from '../auth.service';
import { Payload } from 'src/module/core/auth/model/auth.model';

@Injectable()
export class JwtManagerStrategy extends PassportStrategy(
  Strategy,
  'jwt_manager',
) {
  constructor(private authService: OpeAuthService) {
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
