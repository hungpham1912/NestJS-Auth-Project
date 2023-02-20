import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthManagerStrategy } from 'src/module/core/auth/models/auth.model';

@Injectable()
export class LocalManagerAuthGuard extends AuthGuard(
  AuthManagerStrategy.BASIC,
) {}
