import { Permission, Role, RolePermission, User } from '@prisma/client';

type RoleWithPermission = RolePermission & {
  permission?: Permission;
};
export type RoleUser = Role & {
  roles_permissions?: RoleWithPermission[];
};
export type UserWithRole = Omit<User, 'password'> & {
  role?: RoleUser;
};
