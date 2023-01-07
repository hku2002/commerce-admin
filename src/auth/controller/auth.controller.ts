import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SignInDto } from '../dto/signIn.dto';
import { SignUpDto } from '../dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  @UsePipes(ValidationPipe)
  signUp(@Body() signUpDto: SignUpDto): Promise<boolean> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/sign-in')
  @UsePipes(ValidationPipe)
  signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
  }
}
