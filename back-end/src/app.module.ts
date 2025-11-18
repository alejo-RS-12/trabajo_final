import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/module/usuario.module';
import { RolModule } from './rol/module/rol.module';
import { ClienteModule } from './cliente/module/cliente.module';
import { ProfesionalModule } from './profesional/module/profesional.module';
import { ProfesionModule } from './profesion/module/profesion.module';
import { PublicacionModule } from './publicacion/module/publicacion.module';
import { MensajeModule } from './mensaje/module/mensaje.module';
import { AuthModule } from './auth/module/auth.module';

// entidades
import { Usuario } from './usuario/entities/usuario.entity';
import { Rol } from './rol/entities/rol.entity';
import { Cliente } from './cliente/entities/cliente.entity';
import { Profesional } from './profesional/entities/profesional.entity';
import { Profesion } from './profesion/entities/profesion.entity';
import { ProfesionalProfesion } from './profesional/entities/profesionalprofesion.entity';
import { Publicacion } from './publicacion/entities/publicacion.entity';
import { Mensaje } from './mensaje/entities/mensaje.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
      serveRoot: '',   
    }),
    //conexión a la base de datos
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'THEspectre12!',
      database: process.env.DB_NAME || 'ropo2',
      autoLoadEntities: true,
      entities: [
        Usuario,
        Rol,
        Cliente,
        Profesional,
        Profesion,
        ProfesionalProfesion,
        Publicacion,
        Mensaje,
      ],
      synchronize: false,
      logging: false,
    }),

    //esto es lo que había antes
    AuthModule,
    UsuarioModule,
    RolModule,
    ClienteModule,
    ProfesionalModule,
    ProfesionModule,
    PublicacionModule,
    MensajeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
