import { HttpStatus, Injectable } from '@nestjs/common';
import { Unauthorized } from 'src/shared/exception/auth.exception';
import { UsersService } from 'src/module/core/users/users.service';
import { AuthService } from 'src/module/core/auth/auth.service';
import {
  Payload,
  ResponseAuthUser,
} from 'src/module/core/auth/model/auth.model';
import { RegisterUserDto } from 'src/module/core/auth/dto/auth.dto';
import { AuthInterface } from 'src/module/core/auth/interfaces/auth.interface';
import { BasicResponse } from 'src/shared/response/basic.response';
import { AUTH_ERROR } from './error/message.error';

@Injectable()
export class CliAuthService implements AuthInterface {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  async validateBasic(phone: string, password: string): Promise<BasicResponse> {
    try {
      const user = await this.userService.findOne({ phone: phone });
      if (!user)
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          data: {
            error: AUTH_ERROR[1],
            code: HttpStatus.UNAUTHORIZED,
          },
        };

      const passwordInvalid = await this.authService.checkPassword(
        password,
        user.password,
      );
      if (!passwordInvalid)
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          data: {
            error: AUTH_ERROR[2],
            code: HttpStatus.UNAUTHORIZED,
          },
        };

      const payload: Payload = {
        id: user.id,
        sub: user.id,
      };
      const accessToken = await this.authService.generateJwtToken(payload);
      const result: BasicResponse = {
        statusCode: HttpStatus.OK,
        data: { ...user, accessToken },
      };

      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {
          error: AUTH_ERROR[3],
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        },
      };
    }
  }

  async register(body: RegisterUserDto) {
    const checkEmail = await this.userService.findOne([
      { email: body.email },
      { phone: body.phone },
    ]);
    if (checkEmail)
      throw Unauthorized(
        'Email or Phone already exists in the system',
        'USERNAME_ALREADY_EXIST',
      );
    const newPass = await this.authService.hashPassword(body.password);
    body.password = newPass;

    const user = await this.userService.create(body);
    const payload: Payload = {
      id: user.id,
      sub: user.id,
    };
    const accessToken = await this.authService.generateJwtToken(payload);
    const result: ResponseAuthUser = { ...user, accessToken };

    return result;
  }

  async validateByToken(id: string) {
    const user = await this.userService.findOne({ id: id });
    if (!user) {
      throw Unauthorized('Token failed', 'TOKEN_FAILED');
    }
    return user;
  }
}
