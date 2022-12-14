import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Post()
  createProduct(
    @Body('name') name: string,
    @Body('imgPath') imgPath: string,
    @Body('defaultPrice') defaultPrice: number,
    @Body('salePrice') salePrice: number,
  ): number {
    return this.productService.createProduct(
      name,
      imgPath,
      defaultPrice,
      salePrice,
    );
  }
}
