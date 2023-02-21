import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async paginate(query) {
    // const result = paginate(
    //   query,
    //   this.userRepository.createQueryBuilder('users'),
    //   {
    //     sortableColumns: ['createdAt'],
    //     defaultSortBy: [['createdAt', 'DESC']],
    //   },
    // );
    // const ts = new PaginateBuilder<User>().setRepository(User).find();
    // return ts;
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
