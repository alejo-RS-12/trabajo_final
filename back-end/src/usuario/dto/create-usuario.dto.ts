export class CreateUsuarioDto {
  nombreCompleto: string;
  nombreDeUsuario: string;
  email: string;
  contrasena: string;
  fechaRegistro: Date;
  idRol: number;
  idProfesion?: number[];
}
