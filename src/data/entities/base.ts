import { Column, CreateDateColumn, Timestamp, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @Column({ name: 'isEnabled', type: 'bool', default: true })
  isEnabled: boolean;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
  updatedAt: Timestamp;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt: Timestamp;
}
