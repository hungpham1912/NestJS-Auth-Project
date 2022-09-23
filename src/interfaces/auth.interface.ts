import {
  RegisterManagerDto,
  RegisterUserDto,
} from 'src/module/core/auth/dto/auth.dto';
import {
  ResponseAuthManager,
  ResponseAuthUser,
} from 'src/module/core/auth/model/auth.model';
import { Manager } from '../module/core/managers/entities/manager.entity';
import { User } from '../module/core/users/entities/user.entity';

export interface AuthInterface {
  validateBasic(
    phone: string,
    password: string,
  ): Promise<ResponseAuthManager | ResponseAuthUser>;

  register(
    body: RegisterManagerDto | RegisterUserDto,
  ): Promise<ResponseAuthManager | ResponseAuthUser>;

  validateByToken(id: string): Promise<Manager | User>;
}
