import { Module } from '@nestjs/common';
import { OpeAuthController } from './auth/auth.controller';
import { OpeAuthModule } from './auth/auth.module';
import { OpUsersController } from './users/users.controller';
import { OpUsersModule } from './users/users.module';

@Module({
  imports: [OpeAuthModule, OpUsersModule],
  controllers: [OpeAuthController, OpUsersController],
  exports: [],
})
export class OperatorModule {}
