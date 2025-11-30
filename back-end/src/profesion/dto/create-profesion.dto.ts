import { IsNotEmpty, IsString, MaxLength, IsNumber } from 'class-validator';
export class CreateProfesionDto {
  @IsNumber({}, { message: 'El idUsuario debe ser un número válido.' })
  @IsNotEmpty({ message: 'El idUsuario es obligatorio.' })
  idProfesion: number;
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MaxLength(255, { message: 'El nombre no puede superar los 255 caracteres.' })
  nombre: string;
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MaxLength(255, { message: 'El nombre no puede superar los 255 caracteres.' })
  descripcion: string;
}
