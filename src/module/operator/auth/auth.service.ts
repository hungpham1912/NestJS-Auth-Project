import { Injectable } from '@nestjs/common';
import { Unauthorized } from 'shared/exception/auth.exception';
import { ManagersService } from 'src/module/core/managers/managers.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/auth.dto';
import { Payload, ResponseAuthManager } from './models/auth.model';

@Injectable()
export class OpeAuthService {
  constructor(
    private readonly managerService: ManagersService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(
    phone: string,
    password: string,
  ): Promise<ResponseAuthManager> {
    const manager = await this.managerService.findOne({ phone: phone });
    if (!manager) throw Unauthorized(`Can't find phone number`);

    const passwordInvalid = await this.checkPassword(
      password,
      manager.password,
    );
    if (!passwordInvalid) throw Unauthorized('Password failed');

    const payload: Payload = {
      id: manager.id,
      sub: manager.id,
    };
    const accessToken = await this.generateJwtToken(payload);
    const result: ResponseAuthManager = { ...manager, accessToken };

    return result;
  }

  async checkPassword(input: string, password: string) {
    return await bcrypt.compare(input, password);
  }

  async generateJwtToken(payload: Payload) {
    return this.jwt.sign(payload, { secret: process.env.JWT_KEY });
  }

  async register(body: RegisterDto) {
    const checkEmail = await this.managerService.findOne([
      { email: body.email },
      { phone: body.phone },
    ]);
    if (checkEmail)
      throw Unauthorized('Email or Phone already exists in the system');

    const newPass = await this.hashPassword(body.password);
    body.password = newPass;

    const manager = await this.managerService.create(body);
    const payload: Payload = {
      id: manager.id,
      sub: manager.id,
    };
    const accessToken = await this.generateJwtToken(payload);
    const result: ResponseAuthManager = { ...manager, accessToken };

    return result;
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async validateUserByToken(id: string) {
    const user = await this.managerService.findOne({ id: id });
    if (!user) {
      throw Unauthorized('Token failed');
    }
    return user;
  }
}
