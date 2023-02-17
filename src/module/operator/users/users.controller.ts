import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MangerRole } from 'src/module/core/managers/entities/manager.entity';
import { ManagerRoles } from 'src/wanders/decorators/role.decorator';
import { UUIDPipe } from 'src/wanders/pipes/uuid.pipe';
import { JwtAuthManagerGuard } from '../auth/guards/jwt-auth.guard';
import { MangerRolesGuard } from '../auth/guards/role.guard';
import { OpUsersService } from './users.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthManagerGuard, MangerRolesGuard)
@Controller('users')
export class OpUsersController {
  constructor(private readonly opUsersService: OpUsersService) {}

  @ApiQuery({
    example: 1,
    name: 'page',
  })
  @ApiQuery({
    example: 10,
    name: 'limit',
  })
  @Get()
  @ManagerRoles(MangerRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK' })
  getAll(@Paginate() query: PaginateQuery) {
    return this.opUsersService.getAll(query);
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
