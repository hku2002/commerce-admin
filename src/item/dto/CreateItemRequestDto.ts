import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemRequestDto {
  @ApiProperty({
    example: '강아지 사료1',
    description: '이름',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'www.test.com/img/test.jpg',
    description: '이미지 경로',
  })
  @IsNotEmpty()
  imgPath: string;

  @ApiProperty({
    example: 10000,
    description: '기본 가격',
  })
  @IsNotEmpty()
  defaultPrice: number;

  @ApiProperty({
    example: 9000,
    description: '판매 가격',
  })
  @IsNotEmpty()
  salePrice: number;

  @ApiProperty({
    example: 1000,
    description: '할인 가격',
  })
  @IsNotEmpty()
  discountPrice: number;

  @ApiProperty({
    example: 10,
    description: '할인율(예: 10%, 20%)',
  })
  @IsNotEmpty()
  discountRate: number;

  @ApiProperty({
    example: 'PRICE',
    description:
      '할인방식("NO_DISCOUNT: 할인안함", "RATE: 정률", "PRICE: 정액")',
  })
  @IsNotEmpty()
  discountMethod: string;

  @ApiProperty({
    example: 5000,
    description: '공급가',
  })
  @IsNotEmpty()
  supplyPrice: number;

  @ApiProperty({
    example: 100,
    description: '재고수량',
  })
  @IsNotEmpty()
  stockQuantity: number;
}
