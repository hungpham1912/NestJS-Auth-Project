import {
  RegisterManagerDto,
  RegisterUserDto,
} from 'src/module/core/auth/dto/auth.dto';
import {
  ResponseAuthManager,
  ResponseAuthUser,
} from 'src/module/core/auth/models/auth.model';
import { BasicResponse } from 'src/shared/basic.response';
import { Manager } from '../../managers/entities/manager.entity';
import { User } from '../../users/entities/user.entity';

export declare class AuthDAO {
  validateBasic(
    phone: string,
    password: string,
  ): Promise<ResponseAuthManager | ResponseAuthUser | BasicResponse>;

  register(
    body: RegisterManagerDto | RegisterUserDto,
  ): Promise<ResponseAuthManager | ResponseAuthUser | BasicResponse>;

  validateByToken(id: string): Promise<Manager | User>;
}
