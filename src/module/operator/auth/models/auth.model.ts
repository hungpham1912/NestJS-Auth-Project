import { Manager } from '../../../core/managers/entities/manager.entity';

export class ResponseAuthManager extends Manager {
  accessToken: string;
}

export class Payload {
  id: string;
  sub: string;
}
