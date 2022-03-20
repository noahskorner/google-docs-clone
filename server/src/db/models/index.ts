import sequelize from '../../config/db.config';
import Sequelize from 'sequelize';
import { User } from './user.model';
import { RefreshToken } from './refresh-token.model';
import { Role } from './role.model';
import { UserRole } from './user-role.model';
import { Document } from './document.model';

sequelize.addModels([User, RefreshToken, Role, UserRole, Document]);

const db = {
  Sequelize,
  sequelize,
  User,
  RefreshToken,
  Role,
  UserRole,
  Document,
};

export default db;
