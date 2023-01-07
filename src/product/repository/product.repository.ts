import { Product } from '../entity/product.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateProductRequestDto } from '../dto/create-product.request.dto';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async createProduct(
    createProductRequestDto: CreateProductRequestDto,
  ): Promise<Product> {
    const {
      name,
      imgPath,
      defaultPrice,
      salePrice,
      discountPrice,
      discountRate,
      discountMethod,
      status,
      compositionType,
      mainItemId,
    } = createProductRequestDto;
    const product = this.create({
      name,
      imgPath,
      defaultPrice,
      salePrice,
      discountPrice,
      discountRate,
      discountMethod,
      status,
      compositionType,
      mainItemId,
    });
    await this.save(product);
    return product;
  }
}
