import {
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInRequestDto } from '../dto/sign-in.request.dto';
import { SignUpRequestDto } from '../dto/sign-up.request.dto';
import * as bcrypt from 'bcryptjs';
import { AdminUserRepository } from '../repository/admin-user.repository';
import { AdminUser } from '../entity/admin-user.entity';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import * as dayjs from 'dayjs';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    private adminUserRepository: AdminUserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(REQUEST) private readonly request: Request,
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
      { refreshToken, updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss') },
    );
    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshTokenParam: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      await this.jwtService.verifyAsync(refreshTokenParam, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException('인증에 실패하였습니다.');
    }

    // TODO 만료시간 체크

    const decode = this.getTokenDecode(refreshTokenParam);
    const adminUser = await this.adminUserRepository.findOne({
      where: { id: decode['id'], activated: true },
    });

    if (!this.tokenCompare(refreshTokenParam, adminUser?.refreshToken)) {
      throw new UnauthorizedException('인증에 실패하였습니다.');
    }

    const { accessToken, refreshToken } = await this.getTokens(
      adminUser.id,
      adminUser.username,
    );
    await this.adminUserRepository.update(
      { id: adminUser.id },
      { refreshToken, updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss') },
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

  getTokenDecode(refreshToken: string): { [p: string]: any } | string {
    const decoded = this.jwtService.decode(refreshToken);
    if (!decoded) {
      throw new UnauthorizedException('토큰 정보가 없습니다.');
    }

    return decoded;
  }

  tokenCompare(tokenParam: string, savedToken: string): boolean {
    if (tokenParam === savedToken) {
      return true;
    }
    return false;
  }
}
