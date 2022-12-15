import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 5432,
  username: 'ea',
  password: 'test',
  database: 'test',
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
};
