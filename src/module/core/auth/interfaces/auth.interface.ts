import { RegisterUserDto } from 'src/module/client/auth/dto/auth.dto';
import { ResponseAuthUser } from 'src/module/client/auth/models/auth.model';
import { RegisterDto } from 'src/module/operator/auth/dto/auth.dto';
import { ResponseAuthManager } from 'src/module/operator/auth/models/auth.model';
import { Manager } from '../../managers/entities/manager.entity';
import { User } from '../../users/entities/user.entity';

export interface AuthInterface {
  validateBasic(
    phone: string,
    password: string,
  ): Promise<ResponseAuthManager | ResponseAuthUser>;

  register(
    body: RegisterDto | RegisterUserDto,
  ): Promise<ResponseAuthManager | ResponseAuthUser>;

  validateByToken(id: string): Promise<Manager | User>;
}
