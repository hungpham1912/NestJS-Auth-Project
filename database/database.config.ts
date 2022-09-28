import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Manager } from 'src/module/core/managers/entities/manager.entity';
import { User } from 'src/module/core/users/entities/user.entity';

export class DatabaseConfig {
  config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.HOST,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [Manager, User],
    synchronize: true,
  };

  getConfig() {
    return this.config;
  }
}

export enum TableName {
  MANAGER = 'managers',
  USER = 'users',
}
