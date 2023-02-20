import { Injectable } from '@nestjs/common';
import { PaginateQuery } from 'nestjs-paginate';
import { UsersService } from 'src/module/core/users/users.service';

@Injectable()
export class OpUsersService {
  constructor(private readonly usersService: UsersService) {}

  async getAll(query: PaginateQuery) {
    const { limit, page, filter } = query;
    return await this.usersService.paginate(query);
  }

  getOne(id: string) {
    return this.usersService.findOne({ id });
  }
}
