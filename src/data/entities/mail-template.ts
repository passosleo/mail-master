import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base';
import { User } from './user';

@Entity({ name: 'mail_template' })
export class MailTemplate extends BaseEntity {
  @PrimaryColumn('uuid', {
    name: 'template_id',
    primaryKeyConstraintName: 'PK_mail_template_id',
  })
  templateId: string;

  @Column({ name: 'name', type: 'varchar', unique: true, length: 100 })
  name: string;

  @Column({ name: 'file', type: 'varchar', unique: true, length: 100 })
  file: string;

  @ManyToOne(() => User, (user) => user.userId)
  createdBy: string;

  @ManyToOne(() => User, (user) => user.userId)
  updatedBy: string;
}
