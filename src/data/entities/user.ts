import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from './base';
import { UserRoles } from '../dtos/user';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_id',
    primaryKeyConstraintName: 'PK_user_id',
  })
  userId: string;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'email', type: 'varchar', unique: true, length: 100 })
  email: string;

  @Column({ name: 'email_verified', type: 'bool', default: false })
  emailVerified: boolean;

  @Column({ name: 'password', type: 'varchar', length: 250, nullable: true })
  password: string | null;

  @Column({ name: 'role', type: 'varchar', length: 100, default: 'user' })
  role: UserRoles;
}
