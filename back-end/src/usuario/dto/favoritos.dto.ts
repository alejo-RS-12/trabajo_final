import { IsNumber } from 'class-validator';

export class AddFavoritoDto {
  @IsNumber()
  idPublicacion: number;
}

export class RemoveFavoritoDto {
  @IsNumber()
  idPublicacion: number;
}