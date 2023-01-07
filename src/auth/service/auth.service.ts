import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '../dto/signIn.dto';
import { SignUpDto } from '../dto/signUp.dto';
import * as bcrypt from 'bcryptjs';
import { AdminUserRepository } from '../repository/adminUser.repository';
import { AdminUser } from '../entity/adminUser.entity';

@Injectable()
export class AuthService {
  constructor(
    private adminUserRepository: AdminUserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<boolean> {
    const { email, password, username } = signUpDto;
    const hashedPassword = await this.generateHashedPassword(password);
    await this.adminUserRepository.createAdminUser({
      email,
      password: hashedPassword,
      username,
    });
    return true;
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password } = signInDto;
    const adminUser: AdminUser = await this.adminUserRepository.findOne({
      where: { email },
    });
    await this.checkAdminUserExist(adminUser);
    await this.checkPassword(password, adminUser.password);

    const id: number = adminUser.id;
    const payload = { id };
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
