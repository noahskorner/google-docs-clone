import sequelize from '../../config/db.config';
import Sequelize from 'sequelize';
import { User } from './user.model';
import { RefreshToken } from './refreshToken.model';
import { Role } from './role.model';
import { UserRole } from './userRole';

sequelize.addModels([User, RefreshToken, Role, UserRole]);

const db = {
  Sequelize,
  sequelize,
  User,
  RefreshToken,
  Role,
  UserRole,
};

export default db;
