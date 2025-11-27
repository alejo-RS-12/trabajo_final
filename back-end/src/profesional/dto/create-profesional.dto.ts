import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
export class CreateProfesionalDto {
  @IsNumber({}, { message: 'El idUsuario debe ser un número válido.' })
  @IsNotEmpty({ message: 'El idUsuario es obligatorio.' })
  idUsuario: number;
  @IsOptional()
  @IsString({ message: 'La matrícula debe ser una cadena de texto.' })
  matricula?: string;
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  descripcion?: string;
  @IsOptional()
  @IsNumber({}, { message: 'El id de Profesiones ser un número válido.' })
  profesionesIds?: number[];
}
