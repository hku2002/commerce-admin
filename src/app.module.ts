import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './common/configs/typeorm.config';
import { ItemModule } from './item/item.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), ProductModule, ItemModule],
})
export class AppModule {}
