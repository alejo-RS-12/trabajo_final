import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Rol } from '../rol/entities/rol.entity';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Usuario, Rol])],
  providers: [ClienteService],
  controllers: [ClienteController],
  exports: [ClienteService],
})
export class ClienteModule {}
