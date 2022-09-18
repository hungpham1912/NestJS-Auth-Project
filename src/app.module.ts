import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../database/database.config';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
