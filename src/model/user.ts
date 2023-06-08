import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'userId', primaryKeyConstraintName: 'PK_user_userId' })
  userId: string;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'email', type: 'varchar', length: 100 })
  email: string;

  @Column({ name: 'emailVerified', type: 'bool', default: false })
  emailVerified: boolean;

  @Column({ name: 'password', type: 'varchar', length: 250, nullable: true })
  password: string | null;

  @Column({ name: 'role', type: 'varchar', length: 100, default: 'user' })
  role: 'admin' | 'user';
}
