import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicacionDto } from './create-publicacion.dto';
import { EstadoPublicacion } from '../entities/publicacion.entity';

export class UpdatePublicacionDto extends PartialType(CreatePublicacionDto) {
  titulo?: string;
  descripcion?: string;
  ubicacion?: string;
  estado?: EstadoPublicacion;
  idProfesional?: number;
  imagenes?: string[]; // 👈 array también acá
}
