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

  hashPassword = (password: string) => {
    const salt = bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  };
}
