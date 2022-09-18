import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/module/operator/auth/dto/auth.dto';
import { Repository } from 'typeorm';
import { Manager } from './entities/manager.entity';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
  ) {}

  async create(body: RegisterDto) {
    const create = this.managerRepository.create(body);
    return await this.managerRepository.save(create);
  }

  async findOne(query: any) {
    return await this.managerRepository.findOne({ where: query });
  }
}
