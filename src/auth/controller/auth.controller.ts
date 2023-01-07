import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SignInRequestDto } from '../dto/sign-in.request.dto';
import { SignUpRequestDto } from '../dto/sign-up.request.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  @UsePipes(ValidationPipe)
  signUp(@Body() signUpRequestDto: SignUpRequestDto): Promise<boolean> {
    return this.authService.signUp(signUpRequestDto);
  }

  @Post('/sign-in')
  @UsePipes(ValidationPipe)
  signIn(
    @Body() signInRequestDto: SignInRequestDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInRequestDto);
  }
}
