import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterUserDto } from 'src/module/core/auth/dto/auth.dto';
import { ResponseAuthUser } from 'src/module/core/auth/model/auth.model';
import { CliAuthService } from './auth.service';
import { LocalUserAuthGuard } from './guards/local.guard';
import { BasicResponseDecorator } from 'src/decorators/basic.decorator';
import { BasicResponse } from 'src/shared/response/basic.response';

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
  async login(@BasicResponseDecorator() basic: BasicResponse, @Res() res: any) {
    return res.status(basic.statusCode).send(basic.data);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register for user' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK', type: ResponseAuthUser })
  async register(@Body() body: RegisterUserDto, @Res() res: any) {
    try {
      const result = await this.cliAuthService.register(body);
      return res.status(result.statusCode).send(result.data);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
