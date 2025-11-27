import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateClienteDto {
  @IsNumber({}, { message: 'El idUsuario debe ser un número válido.' })
  @IsNotEmpty({ message: 'El idUsuario es obligatorio.' })
  idUsuario: number;
}
