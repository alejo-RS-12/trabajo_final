import { PartialType } from '@nestjs/mapped-types';
import { CreateProfesionalDto } from './create-profesional.dto';
import { IsOptional, IsArray, IsInt } from 'class-validator';

export class UpdateProfesionalDto extends PartialType(CreateProfesionalDto) {
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  profesiones?: number[];

  @IsOptional()
  cantidadCalificaciones?: number;

  @IsOptional()
  calificacionPromedio?: number;
}