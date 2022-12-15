import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'commerce',
  synchronize: true, // true 면 자동 테이블 생성
  logging: true,
  entities: [__dirname + '../**/*.entity.{js,ts}'],
};
