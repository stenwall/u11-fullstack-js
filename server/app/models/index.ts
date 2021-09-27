import Role, { RoleDocument } from './role.model';
import User, { UserDocument } from './user.model';
import House, { HouseDocument } from './house.model';

export const dbModel = {
  User,
  Role,
  House,
  ROLES: ['user', 'admin', 'super-admin']
};

export { UserDocument, RoleDocument, HouseDocument};
