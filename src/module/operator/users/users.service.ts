import { Injectable } from '@nestjs/common';
import { PaginateQuery } from 'nestjs-paginate';
import { UserFilter } from 'src/module/core/users/models/user.model';
import { UsersService } from 'src/module/core/users/users.service';

@Injectable()
export class OpUsersService {
  constructor(private readonly usersService: UsersService) {}

  async getAll(query: PaginateQuery, filter: UserFilter) {
    console.log(
      '🚀 ~ file: users.service.ts:11 ~ OpUsersService ~ getAll ~ filter:',
      filter,
    );
    return await this.usersService.paginate(query);
  }

  getOne(id: string) {
    return this.usersService.findOne({ id });
  }
}
