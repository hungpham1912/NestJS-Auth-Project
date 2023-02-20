import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import {
  AuthManagerStrategy,
  ResponseAuthManager,
} from 'src/module/core/auth/models/auth.model';
import { BasicResponse } from 'src/shared/basic.response';
import { OpeAuthService } from '../auth.service';

@Injectable()
export class LocalManagerStrategy extends PassportStrategy(
  Strategy,
  AuthManagerStrategy.BASIC,
) {
  constructor(private readonly authService: OpeAuthService) {
    super({
      usernameField: 'phone',
    });
  }

  async validate(
    phone: string,
    password: string,
  ): Promise<BasicResponse | ResponseAuthManager> {
    return await this.authService.validateBasic(phone, password);
  }
}
