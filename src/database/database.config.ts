import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Manager } from 'src/module/core/managers/entities/manager.entity';
import { User } from 'src/module/core/users/entities/user.entity';
import { getConfig } from 'src/shared/lib/config.lib';

export class DatabaseConfig {
  config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: getConfig('database.host'),
    username: getConfig('database.username'),
    password: getConfig('database.password'),
    database: getConfig('database.database'),
    entities: [Manager, User],
    synchronize: true,
  };

  getConfig() {
    return this.config;
  }
}
