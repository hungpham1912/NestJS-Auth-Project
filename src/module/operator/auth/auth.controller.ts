import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseAuthManager } from 'src/module/core/auth/model/auth.model';
import { OpeAuthService } from './auth.service';
import { LoginDto, RegisterManagerDto } from '../../core/auth/dto/auth.dto';
import { LocalManagerAuthGuard } from './guards/local.guard';
import { BasicResponseDecorator } from 'src/decorators/basic.decorator';
import { BasicResponse } from 'src/shared/basic.response';

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
  async login(@BasicResponseDecorator() basic: BasicResponse) {
    return basic;
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register for admin' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK', type: ResponseAuthManager })
  async register(
    @Body() body: RegisterManagerDto,
  ): Promise<BasicResponse | ResponseAuthManager> {
    try {
      return await this.opeAuthService.register(body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
