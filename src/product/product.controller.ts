import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductRequestDto } from './dto/CreateProductRequestDto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Post()
  createProduct(@Body() createProductRequestDto: CreateProductRequestDto): number {
    return this.productService.createProduct(createProductRequestDto);
  }
}
