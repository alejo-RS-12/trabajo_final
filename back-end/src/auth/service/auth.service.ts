import { Injectable, NotFoundException, BadRequestException, ConflictException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from '../../usuario/entities/usuario.entity';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Profesional } from '../../profesional/entities/profesional.entity';
import { Rol } from '../../rol/entities/rol.entity';

import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { CreateUsuarioDto } from '../../usuario/dto/create-usuario.dto';
import { EmailService } from './email.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,

    @InjectRepository(Profesional)
    private readonly profesionalRepository: Repository<Profesional>,

    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  // ----------------------------------------------------------
  // Registro + envío de correo de verificación
  // ----------------------------------------------------------
  async register(datos: CreateUsuarioDto) {
    // Verificar duplicados
    const existente = await this.usuarioRepository.findOne({
      where: [{ email: datos.email }, { nombreDeUsuario: datos.nombreDeUsuario }],
    });

    if (existente) throw new ConflictException('El usuario o email ya están registrados');

    const hashed = await bcrypt.hash(datos.contrasena, 10);
    const tokenVerificacion = crypto.randomBytes(32).toString('hex');

    const nuevo = this.usuarioRepository.create({
      nombreCompleto: datos.nombreCompleto,
      nombreDeUsuario: datos.nombreDeUsuario,
      email: datos.email,
      contrasena: hashed,
      rol: null,
      tokenVerificacion,
      verificado: false,
    });

    const guardado = await this.usuarioRepository.save(nuevo);

    // Enviar email (no bloqueante en caso de fallo podrías manejarlo diferente)
    await this.emailService.sendVerificationEmail(guardado.email, tokenVerificacion, guardado.nombreDeUsuario, datos.contrasena, );

    // Quitar datos sensibles
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { contrasena: _, tokenVerificacion: __, ...usuarioSinDatos } = guardado;
    return usuarioSinDatos;
  }

  // ----------------------------------------------------------
  // Verificar cuenta por token
  // ----------------------------------------------------------
  async verifyAccount(token: string) {
    const usuario = await this.usuarioRepository.findOne({ where: { tokenVerificacion: token } });
    if (!usuario) throw new BadRequestException('Token inválido o expirado');

    usuario.verificado = true;
    usuario.tokenVerificacion = null;

    await this.usuarioRepository.save(usuario);

    return { message: 'Cuenta verificada correctamente' };
  }

  // ----------------------------------------------------------
  // Validar login
  // ----------------------------------------------------------
  async validateUser(login: string, contrasena: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: [{ email: login }, { nombreDeUsuario: login }],
      relations: ['rol'],
    });

    if (!usuario) return null;

    if (!usuario.verificado) throw new ForbiddenException('Debes verificar tu cuenta antes de iniciar sesión');

    const ok = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!ok) return null;

    // Quitar pass antes de devolver
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { contrasena: _, ...res } = usuario;
    return res;
  }

  // ----------------------------------------------------------
  // Asignar rol (y crear Cliente o Profesional según corresponda)
  // ----------------------------------------------------------
  async asignarRol(idUsuario: number, idRol: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: { idUsuario },
      relations: ['rol'],
    });

    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const rol = await this.rolRepository.findOne({ where: { idRol } });
    if (!rol) throw new BadRequestException('Rol inexistente');

    usuario.rol = rol;
    await this.usuarioRepository.save(usuario);

    // Crear cliente si corresponde
    if (idRol === 2) {
      const existeCliente = await this.clienteRepository.findOne({
        where: { usuario: { idUsuario } },
      });

      if (!existeCliente) {
        const nuevoCliente = this.clienteRepository.create({ usuario });
        await this.clienteRepository.save(nuevoCliente);
      }
    }

    // Crear profesional si corresponde
    if (idRol === 3) {
      const existeProfesional = await this.profesionalRepository.findOne({
        where: { usuario: { idUsuario } },
      });

      if (!existeProfesional) {
        const nuevoProfesional = this.profesionalRepository.create({ usuario });
        await this.profesionalRepository.save(nuevoProfesional);
      }
    }

    // Quitar contraseña antes de devolver
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { contrasena: __, ...usuarioSinContrasena } = usuario;
    return usuarioSinContrasena;
  }

  // ----------------------------------------------------------
  // Generar JWT
  // ----------------------------------------------------------
  generateToken(usuario: any) {
    const payload = { sub: usuario.idUsuario, rol: usuario.rol?.idRol };
    return this.jwtService.sign(payload);
  }
}
