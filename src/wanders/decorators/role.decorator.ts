import { SetMetadata } from '@nestjs/common';
import { MangerRole } from 'src/module/core/managers/entities/manager.entity';
export const ROLES_KEY = 'roles';
export const ManagerRoles = (...role: MangerRole[]) =>
  SetMetadata(ROLES_KEY, role);
