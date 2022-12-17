import { Injectable, NotFoundException } from '@nestjs/common';
import { Status } from './entity/enum/product.enum';
import { CreateProductRequestDto } from './dto/CreateProductRequestDto';
import { Product } from './entity/product.entity';
import { ProductRepository } from './repository/product.repository';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  private products = [];

  async getProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('상품을 찾을 수 없습니다.');
    }

    return product;
  }
  async getProducts() {
    return await this.productRepository.find();
  }

  createProduct(createProductRequestDto: CreateProductRequestDto) {
    const newId = 1;
    const { name, imgPath, salePrice, defaultPrice } = createProductRequestDto;
    const product = {
      id: newId,
      name,
      imgPath,
      defaultPrice,
      salePrice,
      status: Status.STAND_BY,
    };

    this.products.push(product);
    return newId;
  }
}
