import { Item } from '../entity/item.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateItemRequestDto } from '../dto/create-item.request.dto';

@Injectable()
export class ItemRepository extends Repository<Item> {
  constructor(private dataSource: DataSource) {
    super(Item, dataSource.createEntityManager());
  }

  async createItem(createItemRequestDto: CreateItemRequestDto): Promise<Item> {
    const {
      name,
      imgPath,
      defaultPrice,
      salePrice,
      discountPrice,
      discountRate,
      discountMethod,
      supplyPrice,
      stockQuantity,
    } = createItemRequestDto;
    const item = this.create({
      name,
      imgPath,
      defaultPrice,
      salePrice,
      discountPrice,
      discountRate,
      discountMethod,
      supplyPrice,
      stockQuantity,
    });
    await this.save(item);
    return item;
  }
}
