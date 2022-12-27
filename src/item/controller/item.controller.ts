import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ItemService } from '../service/item.service';
import { CreateItemRequestDto } from '../dto/CreateItemRequestDto';
import { Item } from '../entity/item.entity';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createItem(
    @Body() createItemRequestDto: CreateItemRequestDto,
  ): Promise<Item> {
    return this.itemService.createItem(createItemRequestDto);
  }
}
