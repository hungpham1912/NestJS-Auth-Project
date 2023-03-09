import { Injectable } from '@nestjs/common';
import { PaginateQuery } from 'nestjs-paginate';
import { UserFilter } from 'src/module/core/users/models/user.model';
import { UsersService } from 'src/module/core/users/users.service';

@Injectable()
export class OpUsersService {
  constructor(private readonly usersService: UsersService) {}

  async getAll(query: PaginateQuery, filter: UserFilter) {
    try {
      const { limit, page } = query;
      return await this.usersService.paginate(limit, page, query, filter);
    } catch (error) {
      console.log('🚀 ~ file: users.service.ts:15 ~ ', error);
      throw error;
    }
  }

  getOne(id: string) {
    try {
      return this.usersService.findOne({ id });
    } catch (error) {
      console.log('🚀 ~ file: users.service.ts:25 ~  ', error);
      throw error;
    }
  }
}
