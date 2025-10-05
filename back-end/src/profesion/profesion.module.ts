import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesionService } from './profesion.service';
import { ProfesionController } from './profesion.controller';
import { Profesion } from './entities/profesion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profesion])],
  controllers: [ProfesionController],
  providers: [ProfesionService],
  exports: [ProfesionService],
})
export class ProfesionModule {}
