import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { Operator, PaginateBuilder } from 'src/shared/lib/paginate/condition';
import { MoreThan, Repository } from 'typeorm';
import { USER_CONSTANT } from './constants/user.constant';
import { CreateUserDto } from './dto/create.dto';
import { User } from './entities/user.entity';
import { UserFilter } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async paginate(
    limit: number,
    page: number,
    query: PaginateQuery,
    filter: UserFilter,
  ) {
    try {
      const { alias, column } = USER_CONSTANT.paginate;
      const builder = new PaginateBuilder<User>(this.userRepository, alias)
        .andWhere(
          column.fullName,
          filter?.fullName,
          filter?.fullName != undefined || null,
          Operator.LIKE_RIGHT,
        )
        .andWhere(
          column.createdAt,
          filter?.fromDate,
          filter?.fromDate != undefined || null,
          Operator.MT,
        )
        .andWhere(
          column.createdAt,
          filter?.toDate,
          filter?.toDate != undefined || null,
          Operator.LT,
        )

        .getRepository();

      const ts = this.userRepository
        .createQueryBuilder('users')
        .where('users.fullName ilike :fullName', {
          fullName: `${filter?.fullName}%`,
        })
        .andWhere({ createdAt: MoreThan(filter.fromDate) });

      console.log(
        '🚀 ~ file: users.service.ts:54 ~ UsersService ~ ts:',
        builder.getSql(),
      );

      // const ts = builder.getSql();
      console.log(
        '🚀 ~ file: users.service.ts:49 ~ UsersService ~ ts:',
        ts.getSql(),
      );
      return await paginate(query, builder, {
        maxLimit: limit,
        defaultLimit: page,
        sortableColumns: ['createdAt'],
        defaultSortBy: [['createdAt', 'DESC']],
      });
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateUserDto) {
    try {
      const create = this.userRepository.create(body);
      return await this.userRepository.save(create);
    } catch (error) {
      throw error;
    }
  }

  async findOne(query: any) {
    try {
      return await this.userRepository.findOne({ where: query });
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: any) {
    try {
      return await this.userRepository.find({ where: query });
    } catch (error) {
      throw error;
    }
  }
}
