import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './usuario.service';
import { UsersController } from './controllers/usuario.controller';
import { Usuario } from './entities/usuario.entity';
import { Rol } from '.././rol/rol.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol])], // 👈 este módulo maneja la entidad Usuario
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // 👈 opcional si otros módulos necesitan UsersService
})
export class UsersModule {}
