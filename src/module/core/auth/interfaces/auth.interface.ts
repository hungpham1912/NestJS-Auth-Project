import { Manager } from '../../managers/entities/manager.entity';
import { User } from '../../users/entities/user.entity';
import { RegisterManagerDto, RegisterUserDto } from '../dto/auth.dto';
import { ResponseAuthManager, ResponseAuthUser } from '../model/auth.model';

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
