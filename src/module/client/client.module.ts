import { Module } from '@nestjs/common';
import { CliAuthController } from './auth/auth.controller';
import { CliAuthModule } from './auth/auth.module';
import { CliUserController } from './users/user.controller';
import { CliUserModule } from './users/user.module';

@Module({
  imports: [CliAuthModule, CliUserModule],
  controllers: [CliAuthController, CliUserController],
  exports: [],
})
export class ClientModule {}
