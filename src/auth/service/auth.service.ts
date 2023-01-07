import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInRequestDto } from '../dto/sign-in.request.dto';
import { SignUpRequestDto } from '../dto/sign-up.request.dto';
import * as bcrypt from 'bcryptjs';
import { AdminUserRepository } from '../repository/admin-user.repository';
import { AdminUser } from '../entity/admin-user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private adminUserRepository: AdminUserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
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
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = signInRequestDto;
    const adminUser = await this.adminUserRepository.findOne({
      where: { email, activated: true },
    });
    await this.checkAdminUserExist(adminUser);
    await this.checkPassword(password, adminUser.password);
    const { accessToken, refreshToken } = await this.getTokens(
      adminUser.id,
      adminUser.username,
    );
    await this.adminUserRepository.update(
      { id: adminUser.id },
      { refreshToken },
    );
    return { accessToken, refreshToken };
  }

  async generateHashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  checkAdminUserExist(adminUser: AdminUser): void {
    if (!adminUser) {
      throw new UnauthorizedException('로그인에 실패하였습니다.');
    }
  }

  async checkPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<void> {
    if (!(await bcrypt.compare(plainPassword, hashedPassword))) {
      throw new UnauthorizedException('로그인에 실패하였습니다.');
    }
  }

  async getTokens(
    id: number,
    username: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { id, username };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
