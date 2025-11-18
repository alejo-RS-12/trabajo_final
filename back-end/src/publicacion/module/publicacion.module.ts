import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicacionService } from '../service/publicacion.service';
import { PublicacionController } from '../controller/publicacion.controller';
import { Publicacion } from '../entities/publicacion.entity';
import { Profesional } from 'src/profesional/entities/profesional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publicacion, Profesional])],
  controllers: [PublicacionController],
  providers: [PublicacionService],
})
export class PublicacionModule {}
