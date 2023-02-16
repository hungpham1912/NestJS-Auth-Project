import { SetMetadata } from '@nestjs/common';
import { MangerRole } from 'src/module/core/managers/entities/manager.entity';

export enum RoleKey {
  MANAGE = 'manage_roles',
  USER = 'user_roles',
}

export const ManagerRoles = (...role: MangerRole[]) =>
  SetMetadata(RoleKey.MANAGE, role);

export const UserRoles = (...role: MangerRole[]) =>
  SetMetadata(RoleKey.USER, role);
