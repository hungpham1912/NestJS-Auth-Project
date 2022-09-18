import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalManagerAuthGuard extends AuthGuard('basic_manager') {}
