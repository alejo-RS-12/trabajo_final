import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository  } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity'; 
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from '../../usuario/dto/create-usuario.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async validateUser(login: string, contrasena: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: [{ email: login }, { nombreDeUsuario: login }],
    });

    if (!usuario) return null;

    const esValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!esValida) return null;

    const { contrasena: _, ...usuarioSinContrasena } = usuario;
    return usuarioSinContrasena;
  }

  // Registro
  async register(datos: CreateUsuarioDto) {
  // Verificar si ya existe el usuario o email
  const existente = await this.usuarioRepository.findOne({
    where: [
      { email: datos.email },
      { nombreDeUsuario: datos.nombreDeUsuario },
    ],
  });

  if (existente) {
    throw new HttpException(
      'El usuario o el email ya están registrados',
      HttpStatus.CONFLICT,
    );
  }

  // Hashear la contraseña
  const hashed = await bcrypt.hash(datos.contrasena, 10);

  // Crear nuevo usuario
  const nuevoUsuario = this.usuarioRepository.create({
    nombreCompleto: datos.nombreCompleto,
    email: datos.email,
    nombreDeUsuario: datos.nombreDeUsuario,
    contrasena: hashed,
    rol: { idRol: datos.idRol || 2 }
  });

  // Guardar en DB
  const guardado = await this.usuarioRepository.save(nuevoUsuario);

  // Quitar la contraseña del objeto antes de devolverlo
  const { contrasena, ...usuarioSinContrasena } = guardado;

  return usuarioSinContrasena;
}
}