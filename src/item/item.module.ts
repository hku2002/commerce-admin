import { Module } from '@nestjs/common';
import { ItemController } from './controller/item.controller';
import { ItemService } from './service/item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRepository } from './repository/item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ItemRepository])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
