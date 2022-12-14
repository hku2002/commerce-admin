import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  private products = [];

  getProducts() {
    return this.products;
  }
}
