import { Body, Controller, Post, UseGuards, Version } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterUserDto } from 'src/module/core/auth/dto/auth.dto';
import { ResponseAuthUser } from 'src/module/core/auth/models/auth.model';
import { CliAuthService } from './auth.service';
import { LocalUserAuthGuard } from './guards/local.guard';
import { BasicResponse } from 'src/shared/basic.response';
import { User } from 'src/module/core/users/entities/user.entity';
import { AuthResponse } from 'src/wanders/decorators/auth.decorator';
import { BASE_ERROR } from 'src/shared/error/base.error';

@ApiTags('Authentication')
@Controller('auth')
export class CliAuthController {
  constructor(private readonly cliAuthService: CliAuthService) {}

  @Version(['1', '2'])
  @Post('/login')
  @UseGuards(LocalUserAuthGuard)
  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: 'Login for user' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 200, description: 'OK', type: ResponseAuthUser })
  async login(@AuthResponse() user: User): Promise<User> {
    return user;
  }
  @Post('/register')
  @ApiOperation({ summary: 'Register for user' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK', type: ResponseAuthUser })
  async register(
    @Body() body: RegisterUserDto,
  ): Promise<BasicResponse | ResponseAuthUser> {
    try {
      return await this.cliAuthService.register(body);
    } catch (error) {
      return BASE_ERROR[0];
    }
  }
}
