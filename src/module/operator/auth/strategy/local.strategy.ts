import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ResponseAuthManager } from 'src/module/core/auth/model/auth.model';
import { OpeAuthService } from '../auth.service';

@Injectable()
export class LocalManagerStrategy extends PassportStrategy(
  Strategy,
  'basic_manager',
) {
  constructor(private readonly authService: OpeAuthService) {
    super({
      usernameField: 'phone',
    });
  }

  async validate(
    phone: string,
    password: string,
  ): Promise<ResponseAuthManager> {
    return await this.authService.validateBasic(phone, password);
  }
}
