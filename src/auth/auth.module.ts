import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminUserRepository } from './repository/admin-user.repository';
import { JwtAccessTokenStrategy } from './strategy/jwt-access-token.strategy';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh-token.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AdminUserRepository,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
  ],
  exports: [JwtAccessTokenStrategy, JwtRefreshTokenStrategy, PassportModule],
})
export class AuthModule {}
