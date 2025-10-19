import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicacionService } from './publicacion.service';
import { PublicacionController } from './publicacion.controller';
import { Publicacion } from './entities/publicacion.entity';
import { Profesional } from 'src/profesional/entities/profesional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publicacion, Profesional])],
  controllers: [PublicacionController],
  providers: [PublicacionService],
})
export class PublicacionModule {}
