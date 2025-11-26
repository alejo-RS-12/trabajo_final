import {   IsNotEmpty, IsString, MaxLength, IsOptional, IsArray, IsEnum, IsNumber, } from 'class-validator';
import { EstadoPublicacion } from "../entities/publicacion.entity";

export class CreatePublicacionDto {
  @IsNumber({}, { message: 'El idProfesional debe ser un número válido.' })
  @IsNotEmpty({ message: 'El idProfesional es obligatorio.' })
  idProfesional: number;

  @IsString({ message: 'El título debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El título es obligatorio.' })
  @MaxLength(255, { message: 'El título no puede superar los 255 caracteres.' })
  titulo: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  descripcion?: string;

  @IsOptional()
  @IsString({ message: 'La ubicación debe ser una cadena de texto.' })
  ubicacion?: string;

   @IsOptional()
  @IsArray({ message: 'Las imágenes deben enviarse en un arreglo.' })
  @IsString({ each: true, message: 'Cada imagen debe ser una cadena con la ruta del archivo.' })
  imagen?: string[];

  @IsOptional()
  @IsEnum(EstadoPublicacion, { message: 'El estado debe ser: activa, pausada o finalizada.', })
  estado?: EstadoPublicacion;
}
