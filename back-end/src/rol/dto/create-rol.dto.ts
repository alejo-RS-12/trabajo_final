import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRolDto {
  @IsNotEmpty({ message: 'El nombre del rol es obligatorio' })
  @IsString({ message: 'El rol debe ser un texto válido' })
  @MaxLength(50, { message: 'El rol no puede superar los 50 caracteres' })
  nombreRol: string;
}
