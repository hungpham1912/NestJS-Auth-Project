import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { ManagersService } from './managers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Manager])],
  providers: [ManagersService],
  exports: [ManagersService],
})
export class ManagersModule {}
