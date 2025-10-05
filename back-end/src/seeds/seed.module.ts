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
import { Calificacion } from '../calificacion/entities/calificacion.entity';
import { Mensaje } from '../mensaje/entities/mensaje.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Admin',
      database: 'ropo2beta',
      entities: [
        Usuario,
        Rol,
        Cliente,
        Profesional,
        Profesion,
        ProfesionalProfesion,
        Publicacion,
        Calificacion,
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
export class SeedModule {}