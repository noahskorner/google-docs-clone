import sequelize from '../../config/db.config';
import Sequelize from 'sequelize';
import { User } from './user.model';
import { RefreshToken } from './refresh-token.model';
import { Role } from './role.model';
import { UserRole } from './user-role.model';
import { Document } from './document.model';
import { DocumentUser } from './document-user.model';

sequelize.addModels([
  User,
  RefreshToken,
  Role,
  UserRole,
  Document,
  DocumentUser,
]);

const db = {
  Sequelize,
  sequelize,
  User,
  RefreshToken,
  Role,
  UserRole,
  Document,
  DocumentUser,
};

export default db;
