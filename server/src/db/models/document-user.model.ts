import {
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  Column,
  DataType,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Document } from './document.model';
import { DocumentPermissionEnum } from '../../types/enums/document-permission-enum';

@Table({ tableName: 'document_user', underscored: true })
class DocumentUser extends Model {
  @Column(DataType.ENUM('VIEW', 'EDIT'))
  permission!: DocumentPermissionEnum;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  userId!: number;

  @BelongsTo(() => Document)
  document!: Document;

  @ForeignKey(() => Document)
  @PrimaryKey
  @Column
  documentId!: number;
}

export { DocumentUser };
