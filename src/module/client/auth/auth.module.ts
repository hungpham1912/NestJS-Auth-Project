import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/module/core/users/users.module';
import { CliAuthService } from './auth.service';
import { JwtUserStrategy } from './strategy/jwt.strategy';
import { LocalUserStrategy } from './strategy/local.strategy';

@Module({
  imports: [PassportModule, UsersModule],
  providers: [
    UsersModule,
    CliAuthService,
    JwtService,
    LocalUserStrategy,
    JwtUserStrategy,
  ],
  exports: [
    UsersModule,
    CliAuthService,
    JwtService,
    LocalUserStrategy,
    JwtUserStrategy,
  ],
})
export class CliAuthModule {}
