import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CliAuthService } from '../auth.service';
import { ResponseAuthUser } from '../models/auth.model';

@Injectable()
export class LocalUserStrategy extends PassportStrategy(
  Strategy,
  'basic_user',
) {
  constructor(private readonly authService: CliAuthService) {
    super({
      usernameField: 'phone',
    });
  }

  async validate(phone: string, password: string): Promise<ResponseAuthUser> {
    return await this.authService.validateUser(phone, password);
  }
}
