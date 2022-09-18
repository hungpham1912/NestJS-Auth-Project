import { Module } from '@nestjs/common';
import { CliAuthController } from './auth/auth.controller';
import { CliAuthModule } from './auth/auth.module';

@Module({
  imports: [CliAuthModule],
  controllers: [CliAuthController],
  exports: [],
})
export class ClientModule {}
