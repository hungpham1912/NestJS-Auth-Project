import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../database/database.config';
import { ClientModule } from './module/client/client.module';
import { OperatorModule } from './module/operator/operator.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.default.env', isGlobal: true }),
    TypeOrmModule.forRoot(new DatabaseConfig().getConfig()),
    OperatorModule,
    RouterModule.register([
      {
        path: 'api/v1/operator',
        module: OperatorModule,
      },
    ]),
    ClientModule,
    RouterModule.register([
      {
        path: 'api/v1/client',
        module: ClientModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
