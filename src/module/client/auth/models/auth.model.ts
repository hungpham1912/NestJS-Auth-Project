import { User } from 'src/module/core/users/entities/user.entity';

export class ResponseAuthUser extends User {
  accessToken: string;
}

export class Payload {
  id: string;
  sub: string;
}
