import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesional } from '../entities/profesional.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Profesion } from '../../profesion/entities/profesion.entity';
import { ProfesionalProfesion } from '../entities/profesionalprofesion.entity';
import { ProfesionalService } from '../service/profesional.service';
import { ProfesionalController } from '../controller/profesional.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Profesional,
      Usuario,
      Profesion,
      ProfesionalProfesion,
    ]),
  ],
  providers: [ProfesionalService],
  controllers: [ProfesionalController],
})
export class ProfesionalModule {}
