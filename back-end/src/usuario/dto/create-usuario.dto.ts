import {   IsString,   IsEmail,   IsNotEmpty,  MinLength,  MaxLength,  IsNumber,  IsOptional,  IsArray,
  ArrayNotEmpty,  IsInt, } from 'class-validator';

export class CreateUsuarioDto {
  @IsString({ message: 'El nombre completo debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre completo es obligatorio.' })
  @MaxLength(100, { message: 'El nombre completo no puede superar 100 caracteres.' })
  nombreCompleto: string;

  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio.' })
  @MaxLength(100, { message: 'El nombre de usuario no puede superar 100 caracteres.' })
  nombreDeUsuario: string;

  @IsEmail({}, { message: 'El email debe tener un formato válido.' })
  @IsNotEmpty({ message: 'El email es obligatorio.' })
  @MaxLength(150, { message: 'El email no puede superar 150 caracteres.' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  @MaxLength(255, { message: 'La contraseña no puede superar 255 caracteres.' })
  contrasena: string;

  @IsNumber({}, { message: 'El idRol debe ser un número válido.' })
  @IsNotEmpty({ message: 'El idRol es obligatorio.' })
  idRol: number;

  @IsOptional()
  @IsArray({ message: 'idProfesion debe ser un arreglo de números.' })
  @ArrayNotEmpty({ message: 'El arreglo idProfesion no puede estar vacío.', each: false })
  @IsInt({ each: true, message: 'Cada id de profesión debe ser un número entero.' })
  idProfesion?: number[];
}