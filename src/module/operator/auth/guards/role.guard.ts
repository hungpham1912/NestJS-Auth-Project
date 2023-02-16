import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MangerRole } from 'src/module/core/managers/entities/manager.entity';
import { IS_PUBLIC_KEY } from 'src/wanders/decorators/public.decorator';

@Injectable()
export class MangerRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<MangerRole[]>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log(
      '🚀 ~ file: role.guard.ts:19 ~ MangerRolesGuard ~ canActivate ~ user',
      user,
    );
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
