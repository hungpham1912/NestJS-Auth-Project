import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MangerRole } from 'src/module/core/managers/entities/manager.entity';
import { ManagerRoles } from 'src/wanders/decorators/role.decorator';
import { UUIDPipe } from 'src/wanders/pipes/uuid.pipe';
import { JwtAuthManagerGuard } from '../auth/guards/jwt-auth.guard';
import { MangerRolesGuard } from '../auth/guards/role.guard';
import { OpUsersService } from './users.service';

@ApiTags('Users')
@UseGuards(MangerRolesGuard)
@Controller('users')
export class OpUsersController {
  constructor(private readonly opUsersService: OpUsersService) {}

  @Get()
  @ManagerRoles(MangerRole.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthManagerGuard)
  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK' })
  findAll() {
    return this.opUsersService.findAll();
  }

  @Get(':userId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthManagerGuard)
  @ApiOperation({ summary: 'Get an user' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK' })
  findOne(@Param('userId', new UUIDPipe()) id: string) {
    return this.opUsersService.getOne(id);
  }
}
