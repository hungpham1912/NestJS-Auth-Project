import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalUserAuthGuard extends AuthGuard('basic_user') {}
