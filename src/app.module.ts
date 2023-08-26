import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { customProvider } from './app.provider';
import { ENTITIES } from './database/database.config';
import { ClientModule } from './module/client/client.module';
import { OperatorModule } from './module/operator/operator.module';
import { ENV_CONFIG } from './shared/constants/env.constant';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: ENTITIES.default,
      synchronize: true,
      ...ENV_CONFIG.database,
    }),
    OperatorModule,
    RouterModule.register([
      {
        path: 'api/operator',
        module: OperatorModule,
      },
    ]),
    ClientModule,
    RouterModule.register([
      {
        path: 'api/client',
        module: ClientModule,
      },
    ]),
  ],
  providers: [...customProvider],
})
export class AppModule {}
