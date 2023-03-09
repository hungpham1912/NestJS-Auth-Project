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
import { UserFilter } from 'src/module/core/users/models/user.model';
import { UserQuery } from 'src/wanders/decorators/users.decorator';
import { BASE_ERROR } from 'src/shared/error/base.error';

@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthManagerGuard, MangerRolesGuard)
@ManagerRoles(MangerRole.ADMIN)
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
  @ApiQuery({
    example: 10,
    name: 'fullName',
  })
  @ApiQuery({
    example: '2022-02-09',
    name: 'fromDate',
  })
  @ApiQuery({
    example: '2022-02-09',
    name: 'toDate',
  })
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK' })
  async getAll(
    @Paginate() query: PaginateQuery,
    @UserQuery() filter: UserFilter,
  ) {
    try {
      return await this.opUsersService.getAll(query, filter);
    } catch (error) {
      return BASE_ERROR[0];
    }
  }

  @Get(':userId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthManagerGuard)
  @ApiOperation({ summary: 'Get an user' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK' })
  findOne(@Param('userId', new UUIDPipe()) id: string) {
    try {
      return this.opUsersService.getOne(id);
    } catch (error) {
      return BASE_ERROR[0];
    }
  }
}
