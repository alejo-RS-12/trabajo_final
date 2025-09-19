import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { Rol } from '../rol/rol.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,

    @InjectRepository(Rol)
    private readonly rolRepo: Repository<Rol>,
  ) {}

  // 📌 Registro
  async register(data: Partial<Usuario>) {
    // Validar email único
    const existeEmail = await this.usuarioRepo.findOne({ where: { email: data.email } });
    if (existeEmail) throw new BadRequestException('El email ya está registrado');

    // Validar nombre de usuario único
    const existeUser = await this.usuarioRepo.findOne({ where: { nombreDeUsuario: data.nombreDeUsuario } });
    if (existeUser) throw new BadRequestException('El nombre de usuario ya está en uso');

    // Buscar rol por defecto (Usuario común → idRol = 1)
    const rolDefault = await this.rolRepo.findOne({ where: { idRol: 1 } });
    if (!rolDefault) throw new BadRequestException('El rol por defecto no existe en la base de datos');

    // Hashear contraseña
    const hashedPass = await bcrypt.hash(data.contrasena, 10);

    // Crear usuario
    const nuevoUsuario = this.usuarioRepo.create({
      ...data,
      contrasena: hashedPass,
      rol: rolDefault,
    });

    const usuarioGuardado = await this.usuarioRepo.save(nuevoUsuario);

    // No devolver la contraseña
    const { contrasena, ...resto } = usuarioGuardado;

    return { message: 'Usuario registrado correctamente', usuario: resto };
  }

  // 📌 Login
  async login(email: string, contrasena: string) {
    const usuario = await this.usuarioRepo.findOne({ where: { email }, relations: ['rol'] });
    if (!usuario) throw new UnauthorizedException('Credenciales inválidas');

    const match = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!match) throw new UnauthorizedException('Credenciales inválidas');

    const { contrasena: _, ...resto } = usuario;
    return { message: 'Login exitoso', usuario: resto };
  }

  // 📌 Login con Google
  async googleLogin(googleUser: { email: string; nombreCompleto: string }) {
    let usuario = await this.usuarioRepo.findOne({ where: { email: googleUser.email }, relations: ['rol'] });

    if (!usuario) {
      const rolDefault = await this.rolRepo.findOne({ where: { idRol: 1 } });

      usuario = this.usuarioRepo.create({
        email: googleUser.email,
        nombreCompleto: googleUser.nombreCompleto,
        contrasena: null,
        esGoogle: true,
        rol: rolDefault,
      });
      await this.usuarioRepo.save(usuario);
    }

    const { contrasena, ...resto } = usuario;
    return { message: 'Login con Google exitoso', usuario: resto };
  }
}
