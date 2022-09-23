import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateManagerDto } from './dto/create.dto';
import { Manager } from './entities/manager.entity';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
  ) {}

  async create(body: CreateManagerDto) {
    const create = this.managerRepository.create(body);
    return await this.managerRepository.save(create);
  }

  async findOne(query: any) {
    return await this.managerRepository.findOne({ where: query });
  }
}
