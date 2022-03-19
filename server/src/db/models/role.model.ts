import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { RoleEnum } from '../../types/enums';
import { User } from './user.model';
import { UserRole } from './userRole';

@Table({ tableName: 'role', underscored: true, timestamps: false })
class Role extends Model {
  @Column(DataType.ENUM('ADMIN', 'SUPERADMIN'))
  name!: RoleEnum;

  @BelongsToMany(() => User, {
    through: () => UserRole,
  })
  users!: Array<User>;

  @HasMany(() => UserRole, {
    onDelete: 'CASECADE',
  })
  roleUsers!: Array<UserRole>;
}

export { Role };
