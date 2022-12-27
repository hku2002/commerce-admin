import { IsNotEmpty } from 'class-validator';

export class CreateProductItemRequestDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  imgPath: string;

  @IsNotEmpty()
  defaultPrice: number;

  @IsNotEmpty()
  salePrice: number;

  @IsNotEmpty()
  discountPrice: number;

  @IsNotEmpty()
  discountRate: number;

  @IsNotEmpty()
  discountMethod: string;

  @IsNotEmpty()
  supplyPrice: number;

  @IsNotEmpty()
  stock_quantity: number;
}
