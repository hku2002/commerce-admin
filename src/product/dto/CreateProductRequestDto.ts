import { IsNotEmpty } from 'class-validator';

export class CreateProductRequestDto {
  @IsNotEmpty()
  name: string;

  imgPath: string;

  @IsNotEmpty()
  defaultPrice: number;

  @IsNotEmpty()
  salePrice: number;
}
