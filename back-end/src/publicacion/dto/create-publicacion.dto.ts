import { EstadoPublicacion } from "../entities/publicacion.entity";

export class CreatePublicacionDto {
  idProfesional: number;
  titulo: string;
  descripcion?: string;
  ubicacion?: string;
  imagen?: string[];
  estado?: EstadoPublicacion;
}
