import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/module/core/users/users.service';

@Injectable()
export class OpUsersService {
  constructor(private readonly usersService: UsersService) {}

  async findAll() {
    return await this.usersService.findAll(null);
  }

  getOne(id: string) {
    return this.usersService.findOne({ id });
  }
}
