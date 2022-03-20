import {
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  Column,
} from 'sequelize-typescript';
import { Role } from './role.model';
import { User } from './user.model';

@Table({ tableName: 'user_role', underscored: true })
class UserRole extends Model {
  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  userId!: number;

  @BelongsTo(() => Role)
  role!: Role;

  @ForeignKey(() => Role)
  @PrimaryKey
  @Column
  roleId!: number;
}

export { UserRole };
