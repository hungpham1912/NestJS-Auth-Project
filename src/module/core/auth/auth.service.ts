import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ENV_CONFIG } from 'src/shared/constants/env.constant';
import { Payload } from './models/auth.model';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  checkPassword = (input: string, password: string) => {
    return bcrypt.compare(input, password);
  };

  generateJwtToken = async (payload: Payload) => {
    return this.jwt.sign(payload, { secret: ENV_CONFIG.jwt.secret });
  };

  hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    console.log('🚀 ~ file: auth.service.ts:21 ~ AuthService ~ salt:', salt);
    return await bcrypt.hash(password, salt);
  };
}
