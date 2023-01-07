import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInRequestDto } from '../dto/sign-in.request.dto';
import { SignUpRequestDto } from '../dto/sign-up.request.dto';
import * as bcrypt from 'bcryptjs';
import { AdminUserRepository } from '../repository/admin-user.repository';
import { AdminUser } from '../entity/admin-user.entity';

@Injectable()
export class AuthService {
  constructor(
    private adminUserRepository: AdminUserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpRequestDto: SignUpRequestDto): Promise<boolean> {
    const { email, password, username } = signUpRequestDto;
    const hashedPassword = await this.generateHashedPassword(password);
    await this.adminUserRepository.createAdminUser({
      email,
      password: hashedPassword,
      username,
    });
    return true;
  }

  async signIn(
    signInRequestDto: SignInRequestDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = signInRequestDto;
    const adminUser = await this.adminUserRepository.findOne({
      where: { email },
    });
    await this.checkAdminUserExist(adminUser);
    await this.checkPassword(password, adminUser.password);

    const id = adminUser.id;
    const username = adminUser.username;
    const payload = { id, username };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
    // TODO accessToken, refreshToken 2개 관리하는 방식으로 변경
  }

  async generateHashedPassword(password): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  checkAdminUserExist(adminUser: AdminUser): void {
    if (!adminUser) {
      throw new UnauthorizedException('로그인에 실패하였습니다.');
    }
  }

  async checkPassword(plainPassword, hashedPassword): Promise<void> {
    if (!(await bcrypt.compare(plainPassword, hashedPassword))) {
      throw new UnauthorizedException('로그인에 실패하였습니다.');
    }
  }
}
