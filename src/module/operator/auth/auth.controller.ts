import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OpeAuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { LocalManagerAuthGuard } from './guards/local.guard';
import { ResponseAuthManager } from './models/auth.model';

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
  async login(@Req() req: any) {
    return req.user;
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register for admin' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK', type: ResponseAuthManager })
  async register(@Body() body: RegisterDto) {
    return await this.opeAuthService.register(body);
  }
}
