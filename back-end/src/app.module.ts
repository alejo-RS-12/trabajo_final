import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { UsersModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module'; // 👈 importamos el módulo de roles

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'THEspectre12!',
      database: process.env.DB_NAME || 'ropo',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),

    UsersModule,
    RolModule, // 👈 aquí lo agregás
  ],
})
export class AppModule {}
