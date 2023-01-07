import { IsNotEmpty } from 'class-validator';

export class SignUpRequestDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;
}
