import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import {
  AuthUserStrategy,
  ResponseAuthUser,
} from 'src/module/core/auth/models/auth.model';
import { BasicResponse } from 'src/shared/basic.response';
import { CliAuthService } from '../auth.service';

@Injectable()
export class LocalUserStrategy extends PassportStrategy(
  Strategy,
  AuthUserStrategy.BASIC,
) {
  constructor(private readonly authService: CliAuthService) {
    super({
      usernameField: 'phone',
    });
  }

  async validate(
    phone: string,
    password: string,
  ): Promise<BasicResponse | ResponseAuthUser> {
    return await this.authService.validateBasic(phone, password);
  }
}
