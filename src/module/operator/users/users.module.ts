import { Module } from '@nestjs/common';
import { UsersModule } from 'src/module/core/users/users.module';

@Module({
  imports: [UsersModule],
  exports: [UsersModule],
  providers: [UsersModule],
})
export class OpUsersModule {}
