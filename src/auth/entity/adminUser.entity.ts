import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AdminUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  username: string;

  @Column({ type: 'tinyint', nullable: false })
  activated: boolean;

  @Column({ type: 'datetime', nullable: false })
  createdAt: string;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: string;
}
