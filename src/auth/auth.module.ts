import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminUserRepository } from './repository/admin-user.repository';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'hku2002testSecretText1234ManyManyLongText0001HelloWorld',
      signOptions: {
        expiresIn: 60 * 60,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AdminUserRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
