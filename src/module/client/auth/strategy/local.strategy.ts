import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthUserStrategy } from 'src/module/core/auth/model/auth.model';
import { BasicResponse } from 'src/shared/response/basic.response';
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

  async validate(phone: string, password: string): Promise<BasicResponse> {
    return await this.authService.validateBasic(phone, password);
  }
}
