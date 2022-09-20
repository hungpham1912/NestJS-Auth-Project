import { Injectable } from '@nestjs/common';
import { Unauthorized } from 'shared/exception/auth.exception';
import { AuthService } from 'src/module/core/auth/auth.service';
import { AuthInterface } from 'src/module/core/auth/interfaces/auth.interface';
import { ManagersService } from 'src/module/core/managers/managers.service';
import { RegisterDto } from './dto/auth.dto';
import { Payload, ResponseAuthManager } from './models/auth.model';

@Injectable()
export class OpeAuthService implements AuthInterface {
  constructor(
    private readonly managerService: ManagersService,
    private readonly authService: AuthService,
  ) {}

  async validateUser(
    phone: string,
    password: string,
  ): Promise<ResponseAuthManager> {
    const manager = await this.managerService.findOne({ phone: phone });
    if (!manager) throw Unauthorized(`Can't find phone number`);

    const passwordInvalid = await this.authService.checkPassword(
      password,
      manager.password,
    );
    if (!passwordInvalid) throw Unauthorized('Password failed');

    const payload: Payload = {
      id: manager.id,
      sub: manager.id,
    };
    const accessToken = await this.authService.generateJwtToken(payload);
    const result: ResponseAuthManager = { ...manager, accessToken };

    return result;
  }

  async register(body: RegisterDto) {
    const checkEmail = await this.managerService.findOne([
      { email: body.email },
      { phone: body.phone },
    ]);
    if (checkEmail)
      throw Unauthorized('Email or Phone already exists in the system');

    const newPass = await this.authService.hashPassword(body.password);
    body.password = newPass;

    const manager = await this.managerService.create(body);
    const payload: Payload = {
      id: manager.id,
      sub: manager.id,
    };
    const accessToken = await this.authService.generateJwtToken(payload);
    const result: ResponseAuthManager = { ...manager, accessToken };

    return result;
  }

  async validateUserByToken(id: string) {
    const user = await this.managerService.findOne({ id: id });
    if (!user) {
      throw Unauthorized('Token failed');
    }
    return user;
  }
}
