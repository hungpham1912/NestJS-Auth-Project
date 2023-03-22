import { Injectable, Scope, Logger } from '@nestjs/common';
import { Manager } from 'src/module/core/managers/entities/manager.entity';
import { User } from 'src/module/core/users/entities/user.entity';
import { ENV_CONFIG } from 'src/shared/constants/env.constant';
import { DataSource } from 'typeorm';

export const ENTITIES = [[Manager, User]];

@Injectable({
  scope: Scope.DEFAULT,
})
export class Source {
  public static source: DataSource;

  public static connect() {
    return this.source;
  }

  public static async setConnect() {
    const source = new DataSource({
      type: 'postgres',
      entities: ENTITIES[0],
      synchronize: false,
      ...ENV_CONFIG.database,
    });
    await source
      .initialize()
      .then(() => {
        Logger.log('Data Source has been initialized!');
      })
      .catch((err) => {
        Logger.error('Error during Data Source initialization', err);
      });
    this.source = source;
  }
}
