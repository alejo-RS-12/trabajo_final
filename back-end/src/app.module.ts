import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { UsersModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';  // 👈 Importar el módulo de roles

@Module({
  imports: [
    // 📌 Configuración global de variables de entorno (.env)
    ConfigModule.forRoot({ isGlobal: true }),

    // 📌 Servir el frontend (HTML, CSS, JS)
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'front-end'), // 👈 carpeta con tu index.html y assets
    }),

    // 📌 Conexión con MySQL
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'THEspectre12!',
      database: process.env.DB_NAME || 'ropo',
      autoLoadEntities: true, // 👈 levanta automáticamente todas las entidades
      synchronize: true, // ⚠️ solo usar en desarrollo
      logging: true,
    }),

    // 📌 Módulos de tu aplicación
    UsersModule,
    RolModule, // 👈 ahora Nest conoce tus endpoints de roles
  ],
})
export class AppModule {}
