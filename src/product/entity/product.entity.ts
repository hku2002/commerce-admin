import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../product.model';

export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  imgPath: string;

  @Column({ type: 'int', nullable: false })
  defaultPrice: number;

  @Column({ type: 'int', nullable: false })
  salePrice: number;

  @Column({ type: 'int', nullable: false })
  discountPrice: number;

  @Column({ type: 'int', nullable: false })
  discountPate: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  discountMethod: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  status: Status;

  @Column({ type: 'varchar', length: 30, nullable: false })
  compositionType: string;

  @Column({ type: 'int', nullable: false })
  mainItemId: number;

  @Column({ type: 'tinyint', nullable: false })
  activated: boolean;

  @Column({ type: 'datetime', nullable: false })
  createdAt: string;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: string;
}
