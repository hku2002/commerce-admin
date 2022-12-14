import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductRequestDto } from './dto/CreateProductRequestDto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/:id')
  getProduct(@Param('id') id: number) {
    return this.productService.getProduct(id);
  }

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Post()
  createProduct(
    @Body() createProductRequestDto: CreateProductRequestDto,
  ): number {
    return this.productService.createProduct(createProductRequestDto);
  }
}
