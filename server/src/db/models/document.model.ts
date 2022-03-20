import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'document', underscored: true })
class Document extends Model {
  @Column(DataType.JSONB)
  content!: string;

  @ForeignKey(() => User)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}

export { Document };
