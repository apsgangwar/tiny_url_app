import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA_NAME,
  synchronize: false,
  dropSchema: false,
  logging: true,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
};
