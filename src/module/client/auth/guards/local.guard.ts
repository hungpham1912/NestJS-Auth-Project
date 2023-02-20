import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserStrategy } from 'src/module/core/auth/models/auth.model';

@Injectable()
export class LocalUserAuthGuard extends AuthGuard(AuthUserStrategy.BASIC) {}
