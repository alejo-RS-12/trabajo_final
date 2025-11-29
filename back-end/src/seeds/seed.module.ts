import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Rol } from '../rol/entities/rol.entity';
import { Profesion } from '../profesion/entities/profesion.entity';
import { Profesional } from '../profesional/entities/profesional.entity';
import { Publicacion } from '../publicacion/entities/publicacion.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { ProfesionalProfesion } from '../profesional/entities/profesionalprofesion.entity';
import { Mensaje } from '../mensaje/entities/mensaje.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'bkbxwzqobxfzajhxmrip-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'u9evssi5obkf4laj',
      password: 'N0rx0W3JtjcnFbNVau8i',
      database: 'bkbxwzqobxfzajhxmrip',
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
    }),
    // IMPORTANTE: todos los repositorios que se van a usar en el seed
    TypeOrmModule.forFeature([
      Usuario,
      Rol,
      Profesion,
      Profesional,
      Publicacion,
    ]),
  ],
  providers: [SeedService],
})
export class SeedModule { }