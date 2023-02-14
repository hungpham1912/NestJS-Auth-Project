import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BadRequestExceptionFilter,
  ForbiddenExceptionFilter,
  UnauthorizedExceptionFilter,
} from 'src/shared/filter/filter';
import { DatabaseConfig } from './database/database.config';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ClientModule } from './module/client/client.module';
import { OperatorModule } from './module/operator/operator.module';

const customProvider: Array<any> = [
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  },
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
  providers: [...customProvider],
})
export class AppModule {}
