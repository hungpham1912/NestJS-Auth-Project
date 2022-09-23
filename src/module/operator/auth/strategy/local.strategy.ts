import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { OpeAuthService } from '../auth.service';
import { ResponseAuthManager } from '../models/auth.model';

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
