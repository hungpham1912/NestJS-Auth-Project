import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthInterface } from 'src/module/core/auth/interfaces/auth.interface';
import { AuthService } from 'src/module/core/auth/auth.service';
import {
  Payload,
  ResponseAuthManager,
} from 'src/module/core/auth/model/auth.model';
import { ManagersService } from 'src/module/core/managers/managers.service';
import { RegisterManagerDto } from '../../core/auth/dto/auth.dto';
import { AUTH_ERROR } from 'src/module/core/auth/error/message.error';
import { BasicResponse } from 'src/shared/basic.response';

@Injectable()
export class OpeAuthService implements AuthInterface {
  constructor(
    private readonly managerService: ManagersService,
    private readonly authService: AuthService,
  ) {}

  async validateBasic(
    phone: string,
    password: string,
  ): Promise<BasicResponse | ResponseAuthManager> {
    try {
      const manager = await this.managerService.findOne({ phone: phone });
      if (!manager)
        return {
          error: AUTH_ERROR[1],
          statusCode: HttpStatus.UNAUTHORIZED,
        };
      const passwordInvalid = await this.authService.checkPassword(
        password,
        manager.password,
      );
      if (!passwordInvalid)
        return {
          error: AUTH_ERROR[2],
          statusCode: HttpStatus.UNAUTHORIZED,
        };
      const payload: Payload = {
        id: manager.id,
        sub: manager.id,
      };
      const accessToken = await this.authService.generateJwtToken(payload);
      const data: ResponseAuthManager = { ...manager, accessToken };

      return data;
    } catch (error) {
      console.log('🚀 ~ file: auth.service.ts:55 ~ OpeAuthService ', error);
      return {
        error: AUTH_ERROR[3],
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async register(
    body: RegisterManagerDto,
  ): Promise<BasicResponse | ResponseAuthManager> {
    try {
      const checkEmail = await this.managerService.findOne([
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

      const manager = await this.managerService.create(body);
      const payload: Payload = {
        id: manager.id,
        sub: manager.id,
      };
      const accessToken = await this.authService.generateJwtToken(payload);
      const data: ResponseAuthManager = { ...manager, accessToken };

      return data;
    } catch (error) {
      console.log('🚀 ~ file: auth.service.ts:83 ~ OpAuthService', error);
      throw {
        error: AUTH_ERROR[5],
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async validateByToken(id: string) {
    try {
      const user = await this.managerService.findOne({ id: id });
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      console.log('🚀 ~ file: auth.service.ts:96 ~ OpAuthService ', error);
      return null;
    }
  }
}
