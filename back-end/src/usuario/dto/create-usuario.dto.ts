export class CreateUsuarioDto {
  nombreCompleto: string;
  nombreDeUsuario: string;
  email: string;
  contrasena: string;
  idRol: number;
  idProfesion?: number[];
}
