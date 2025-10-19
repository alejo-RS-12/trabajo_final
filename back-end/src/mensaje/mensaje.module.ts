import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MensajeService } from './mensaje.service';
import { MensajeController } from './mensaje.controller';
import { Mensaje } from './entities/mensaje.entity';
import { Usuario } from '../usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mensaje, Usuario])],
  controllers: [MensajeController],
  providers: [MensajeService],
  exports: [MensajeService],
  
})
export class MensajeModule {}
