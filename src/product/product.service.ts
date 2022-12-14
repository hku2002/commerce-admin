import { Injectable } from '@nestjs/common';
import { Status } from './product.model';

@Injectable()
export class ProductService {
  private products = [];

  getProducts() {
    return this.products;
  }

  createProduct(
    name: string,
    imgPath: string,
    defaultPrice: number,
    salePrice: number,
  ) {
    const newId = 1;
    const product = {
      id: newId,
      name: name,
      imgPath: imgPath,
      defaultPrice: defaultPrice,
      salePrice: salePrice,
      status: Status.STAND_BY,
    };

    this.products.push(product);
    return newId;
  }
}
