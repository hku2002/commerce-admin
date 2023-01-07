import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AdminUser } from '../entity/admin-user.entity';

@Injectable()
export class AdminUserRepository extends Repository<AdminUser> {
  constructor(private dataSource: DataSource) {
    super(AdminUser, dataSource.createEntityManager());
  }

  async createAdminUser({ email, password, username }): Promise<boolean> {
    const adminUser = this.create({
      email,
      password,
      username,
    });
    try {
      await this.save(adminUser);
    } catch (error) {
      console.log('create admin user error : ', error);
      throw new UnauthorizedException('회원가입에 실패하였습니다.');
    }

    return true;
  }
}
