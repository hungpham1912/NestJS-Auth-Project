import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/module/core/users/users.service';
import { AuthService } from 'src/module/core/auth/auth.service';
import {
  Payload,
  ResponseAuthUser,
} from 'src/module/core/auth/models/auth.model';
import { RegisterUserDto } from 'src/module/core/auth/dto/auth.dto';
import { AuthInterface } from 'src/module/core/auth/interfaces/auth.interface';
import { BasicResponse } from 'src/shared/basic.response';
import { AUTH_ERROR } from '../../core/auth/error/message.error';

@Injectable()
export class CliAuthService implements AuthInterface {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  async validateBasic(
    phone: string,
    password: string,
  ): Promise<BasicResponse | ResponseAuthUser> {
    try {
      const user = await this.userService.findOne({ phone: phone });
      if (!user)
        return {
          error: AUTH_ERROR[1],
          statusCode: HttpStatus.UNAUTHORIZED,
        };

      const passwordInvalid = await this.authService.checkPassword(
        password,
        user.password,
      );
      if (!passwordInvalid)
        return {
          error: AUTH_ERROR[2],
          statusCode: HttpStatus.UNAUTHORIZED,
        };

      const payload: Payload = {
        id: user.id,
        sub: user.id,
      };
      const accessToken = await this.authService.generateJwtToken(payload);
      const data: ResponseAuthUser = { ...user, accessToken };

      return data;
    } catch (error) {
      console.log('🚀 ~ file: auth.service.ts:54 ~ CliAuthService ', error);
      throw error;
    }
  }

  async register(
    body: RegisterUserDto,
  ): Promise<BasicResponse | ResponseAuthUser> {
    try {
      const checkEmail = await this.userService.findOne([
        { email: body.email },
        { phone: body.phone },
      ]);
      if (checkEmail)
        return {
          error: AUTH_ERROR[4],
          statusCode: HttpStatus.UNAUTHORIZED,
        };

      const newPass = await this.authService.hashPassword(body.password);
      body.password = newPass;

      const user = await this.userService.create(body);
      const payload: Payload = {
        id: user.id,
        sub: user.id,
      };
      const accessToken = await this.authService.generateJwtToken(payload);
      const data: ResponseAuthUser = { ...user, accessToken };

      return data;
    } catch (error) {
      console.log('🚀 ~ file: auth.service.ts:93 ~ CliAuthService ', error);
      throw error;
    }
  }

  async validateByToken(id: string) {
    try {
      const user = await this.userService.findOne({ id: id });
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      console.log('🚀 ~ file: auth.service.ts:106 ~ CliAuthService ', error);
      return null;
    }
  }
}
