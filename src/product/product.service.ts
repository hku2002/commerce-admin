import { Injectable } from '@nestjs/common';
import { Status } from './product.model';
import { CreateProductRequestDto } from './dto/CreateProductRequestDto';

@Injectable()
export class ProductService {
  private products = [];

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
