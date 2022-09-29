import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BadRequestExceptionFilter,
  ForbiddenExceptionFilter,
  UnauthorizedExceptionFilter,
} from 'shared/filter/filter';
import { DatabaseConfig } from '../database/database.config';
import { ClientModule } from './module/client/client.module';
import { OperatorModule } from './module/operator/operator.module';

const customProvider: Array<any> = [
  {
    provide: APP_FILTER,
    useClass: BadRequestExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: ForbiddenExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: UnauthorizedExceptionFilter,
  },
];

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
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
  providers: [...customProvider],
})
export class AppModule {}
