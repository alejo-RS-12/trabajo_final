import { IsNotEmpty, IsString, MaxLength, IsNumber,} from 'class-validator';

export class CreateMensajeDto {

  @IsString({ message: 'El contenido del mensaje debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El contenido del mensaje no puede estar vacío.' })
  @MaxLength(1000, { message: 'El mensaje no puede superar los 1000 caracteres.' })
  contenido: string;

  @IsNumber({}, { message: 'El idEmisor debe ser un número válido.' })
  @IsNotEmpty({ message: 'El idEmisor es obligatorio.' })
  idEmisor: number;

  @IsNumber({}, { message: 'El idReceptor debe ser un número válido.' })
  @IsNotEmpty({ message: 'El idReceptor es obligatorio.' })
  idReceptor: number;
}