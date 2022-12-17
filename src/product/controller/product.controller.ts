import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { CreateProductRequestDto } from '../dto/CreateProductRequestDto';
import { Product } from '../entity/product.entity';

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
  @UsePipes(ValidationPipe)
  createProduct(
    @Body() createProductRequestDto: CreateProductRequestDto,
  ): Promise<Product> {
    return this.productService.createProduct(createProductRequestDto);
  }
}
