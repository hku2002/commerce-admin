import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductRequestDto } from '../dto/create-product.request.dto';
import { Product } from '../entity/product.entity';
import { ProductRepository } from '../repository/product.repository';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

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

  async createProduct(
    createProductRequestDto: CreateProductRequestDto,
  ): Promise<Product> {
    return this.productRepository.createProduct(createProductRequestDto);
  }
}
