import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CliAuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { LocalUserAuthGuard } from './guards/local.guard';
import { ResponseAuthUser } from './models/auth.model';

@ApiTags('Authentication')
@Controller('auth')
export class CliAuthController {
  constructor(private readonly cliAuthService: CliAuthService) {}

  @Post('/login')
  @UseGuards(LocalUserAuthGuard)
  @ApiBody({ type: LoginUserDto })
  @ApiOperation({ summary: 'Login for user' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK', type: ResponseAuthUser })
  async login(@Req() req: any) {
    return req.user;
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
