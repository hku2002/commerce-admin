import { Module } from '@nestjs/common';
import { ItemController } from './controller/item.controller';
import { ItemService } from './service/item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRepository } from './repository/item.repository';
import { Item } from './entity/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
})
export class ItemModule {}
