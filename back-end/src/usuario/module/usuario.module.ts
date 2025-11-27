import { Module } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioController } from '../controller/usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Profesional } from 'src/profesional/entities/profesional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol, Cliente, Profesional])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
