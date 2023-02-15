import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthManagerStrategy } from 'src/module/core/auth/model/auth.model';
import { BasicResponse } from 'src/shared/response/basic.response';
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

  async validate(phone: string, password: string): Promise<BasicResponse> {
    return await this.authService.validateBasic(phone, password);
  }
}
