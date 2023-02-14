import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterUserDto } from 'src/module/core/auth/dto/auth.dto';
import { ResponseAuthUser } from 'src/module/core/auth/model/auth.model';
import { User } from 'src/module/core/users/entities/user.entity';
import { CurrentUser } from 'src/decorators/user.decorator';
import { CliAuthService } from './auth.service';
import { LocalUserAuthGuard } from './guards/local.guard';

@ApiTags('Authentication')
@Controller('auth')
export class CliAuthController {
  constructor(private readonly cliAuthService: CliAuthService) {}

  @Post('/login')
  @UseGuards(LocalUserAuthGuard)
  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: 'Login for user' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK', type: ResponseAuthUser })
  async login(@CurrentUser() user: User) {
    return user;
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register for user' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK', type: ResponseAuthUser })
  async register(@Body() body: RegisterUserDto) {
    return await this.cliAuthService.register(body);
  }
}
