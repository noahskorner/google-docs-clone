import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsToMany,
  DefaultScope,
} from 'sequelize-typescript';
import { RefreshToken } from './refreshToken.model';
import { Role } from './role.model';
import { UserRole } from './userRole';

@DefaultScope(() => ({
  include: [
    {
      model: UserRole,
      attributes: ['createdAt', 'updatedAt'],
      include: [Role],
    },
  ],
}))
@Table({ tableName: 'user', underscored: true })
class User extends Model {
  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.BOOLEAN)
  isVerified!: boolean;

  @Column(DataType.STRING)
  verificationToken!: string;

  @Column(DataType.STRING)
  passwordResetToken!: string;

  @HasMany(() => RefreshToken, {
    onDelete: 'CASCADE',
  })
  refreshTokens!: Array<RefreshToken>;

  @BelongsToMany(() => Role, {
    through: {
      model: () => UserRole,
    },
  })
  roles!: Array<Role>;

  @HasMany(() => UserRole, {
    onDelete: 'CASCADE',
  })
  userRoles!: Array<UserRole>;
}

export { User };
