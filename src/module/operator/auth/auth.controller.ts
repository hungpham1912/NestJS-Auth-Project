import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseAuthManager } from 'src/module/core/auth/model/auth.model';
import { OpeAuthService } from './auth.service';
import { LoginDto, RegisterManagerDto } from '../../core/auth/dto/auth.dto';
import { LocalManagerAuthGuard } from './guards/local.guard';
import { CurrentOperator } from 'src/decorators/operator.decorator';
import { Manager } from 'src/module/core/managers/entities/manager.entity';

@ApiTags('Authentication')
@Controller('auth')
export class OpeAuthController {
  constructor(private readonly opeAuthService: OpeAuthService) {}

  @Post('/login')
  @UseGuards(LocalManagerAuthGuard)
  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: 'Login for admin' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK', type: ResponseAuthManager })
  async login(@CurrentOperator() manager: Manager) {
    return manager;
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register for admin' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK', type: ResponseAuthManager })
  async register(@Body() body: RegisterManagerDto) {
    return await this.opeAuthService.register(body);
  }
}
