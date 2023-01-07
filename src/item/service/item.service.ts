import { Injectable } from '@nestjs/common';
import { CreateItemRequestDto } from '../dto/create-item.request.dto';
import { Item } from '../entity/item.entity';
import { ItemRepository } from '../repository/item.repository';

@Injectable()
export class ItemService {
  constructor(private itemRepository: ItemRepository) {}

  async createItem(createItemRequestDto: CreateItemRequestDto): Promise<Item> {
    return await this.itemRepository.createItem(createItemRequestDto);
  }
}
