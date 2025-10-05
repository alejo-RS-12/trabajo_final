import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Usuario } from '../usuario/entities/usuario.entity'; 

@Injectable()
export class AuthService {
  constructor(private dataSource: DataSource) {}

  async validateUser(nombreDeUsuario: string, contrasena: string) {
    const repo = this.dataSource.getRepository(Usuario);
    const usuario = await repo.findOne({ where: { nombreDeUsuario } });

    if (!usuario) return null;

    // En producción: usar bcrypt.compare
    if (usuario.contrasena !== contrasena) return null;

    const { contrasena: _, ...usuarioSinContrasena } = usuario;
    return usuarioSinContrasena;
  }
}