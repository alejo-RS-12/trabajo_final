import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';
import { ClienteModule } from './cliente/cliente.module';
import { ProfesionalModule } from './profesional/profesional.module';
import { ProfesionModule } from './profesion/profesion.module';
import { PublicacionModule } from './publicacion/publicacion.module';
import { MensajeModule } from './mensaje/mensaje.module';
import { AuthModule } from './auth/auth.module';

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
    //conexión a la base de datos
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
        Mensaje,
      ],
      synchronize: false,
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
