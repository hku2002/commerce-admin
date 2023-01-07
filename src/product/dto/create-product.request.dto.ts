import { IsNotEmpty } from 'class-validator';
import { Status } from '../entity/enum/product.enum';

export class CreateProductRequestDto {
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
  status: Status;

  @IsNotEmpty()
  compositionType: string;

  @IsNotEmpty()
  mainItemId: number;
}
