import { Injectable } from '@nestjs/common';
import { PaginateQuery } from 'nestjs-paginate';
import { UserFilter } from 'src/module/core/users/models/user.model';
import { UsersService } from 'src/module/core/users/users.service';
import { BASE_ERROR } from 'src/shared/error/base.error';

@Injectable()
export class OpUsersService {
  constructor(private readonly usersService: UsersService) {}

  async getAll(query: PaginateQuery, filter: UserFilter) {
    try {
      const { limit, page } = query;
      return await this.usersService.paginate(limit, page, query, filter);
    } catch (error) {
      console.log('🚀 ~ file: users.service.ts:15 ~ ', error);
      return BASE_ERROR[0];
    }
  }

  getOne(id: string) {
    return this.usersService.findOne({ id });
  }
}
