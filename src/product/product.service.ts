import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, Status } from './product.model';
import { CreateProductRequestDto } from './dto/CreateProductRequestDto';

@Injectable()
export class ProductService {
  private products = [];

  getProduct(id: number): Product {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException('상품을 찾을 수 없습니다.');
    }

    return product;
  }
  getProducts() {
    return this.products;
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
