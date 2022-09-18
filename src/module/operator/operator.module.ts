import { Module } from '@nestjs/common';
import { OpeAuthController } from './auth/auth.controller';
import { OpeAuthModule } from './auth/auth.module';

@Module({
  imports: [OpeAuthModule],
  controllers: [OpeAuthController],
  exports: [],
})
export class OperatorModule {}
