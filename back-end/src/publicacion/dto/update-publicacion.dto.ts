import { IsNotEmpty,  IsString,   MaxLength,   IsOptional,   IsArray,   IsEnum,   IsNumber,} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicacionDto } from './create-publicacion.dto';
import { EstadoPublicacion } from '../entities/publicacion.entity';

export class UpdatePublicacionDto extends PartialType(CreatePublicacionDto) {
  @IsString({ message: 'El título debe ser una cadena de texto.' })
  @IsOptional()
  @MaxLength(255, { message: 'El título no puede superar los 255 caracteres.' })
  titulo?: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto.' }) 
  descripcion?: string;

  @IsOptional()
  @IsString({ message: 'La ubicación debe ser una cadena de texto.' })
  ubicacion?: string;

  @IsOptional()
  @IsEnum(EstadoPublicacion, { message: 'El estado debe ser: activa, pausada o finalizada.', })
  estado?: EstadoPublicacion;

  @IsNumber({}, { message: 'El idProfesional debe ser un número válido.' })
   @IsOptional()
  idProfesional?: number;

  @IsOptional()
  @IsArray({ message: 'Las imágenes deben enviarse en un arreglo.' })
  @IsString({ each: true, message: 'Cada imagen debe ser una cadena con la ruta del archivo.' })
  imagenes?: string[]; 
}
