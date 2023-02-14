import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { getConfig } from 'src/shared/lib/config.lib';
import { Payload } from './model/auth.model';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  async checkPassword(input: string, password: string) {
    return await bcrypt.compare(input, password);
  }

  async generateJwtToken(payload: Payload) {
    return this.jwt.sign(payload, { secret: getConfig('jwt.secret') });
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
