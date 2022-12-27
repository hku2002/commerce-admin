import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'item' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
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
  discountRate: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  discountMethod: string;

  @Column({ type: 'int', nullable: false })
  supplyPrice: number;

  @Column({ type: 'int', nullable: false })
  stockQuantity: number;

  @Column({ type: 'tinyint', nullable: false })
  activated: boolean;

  @Column({ type: 'datetime', nullable: false })
  createdAt: string;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: string;
}
