import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  DefaultScope,
} from 'sequelize-typescript';
import { DocumentUser } from './document-user.model';
import { User } from './user.model';

@DefaultScope(() => ({
  include: [
    {
      model: DocumentUser,
    },
  ],
}))
@Table({ tableName: 'document', underscored: true })
class Document extends Model {
  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.JSONB)
  content!: string;

  @ForeignKey(() => User)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => DocumentUser, {
    onDelete: 'CASCADE',
  })
  users!: Array<DocumentUser>;
}

export { Document };
