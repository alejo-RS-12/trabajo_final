import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
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
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  // -----------------------------------------------------------------------
  //  🔐 Registro de usuario + envío de correo de verificación
  // -----------------------------------------------------------------------
  async register(datos: CreateUsuarioDto) {
    // Verificar si existe email o nombre de usuario
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

    const hashedPassword = await bcrypt.hash(datos.contrasena, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const nuevoUsuario = this.usuarioRepository.create({
      nombreCompleto: datos.nombreCompleto,
      nombreDeUsuario: datos.nombreDeUsuario,
      email: datos.email,
      contrasena: hashedPassword,
      rol: null,
      tokenVerificacion: verificationToken,
      verificado: false,
    });

    const guardado = await this.usuarioRepository.save(nuevoUsuario);

    // Enviar correo de verificación
    await this.emailService.sendVerificationEmail(
      guardado.email,
      verificationToken,
    );

    // Eliminar datos sensibles antes de devolver
    const { contrasena, tokenVerificacion, ...usuarioSinDatosSensibles } =
      guardado;

    return usuarioSinDatosSensibles;
  }

  // -----------------------------------------------------------------------
  //  📧 Verificación de cuenta desde email
  // -----------------------------------------------------------------------
  async verifyAccount(token: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { tokenVerificacion: token },
    });

    if (!usuario) {
      throw new HttpException(
        'Token inválido o expirado',
        HttpStatus.BAD_REQUEST,
      );
    }

    usuario.verificado = true;
    usuario.tokenVerificacion = null;
    await this.usuarioRepository.save(usuario);

    return { message: 'Cuenta verificada correctamente 🎉' };
  }

  // -----------------------------------------------------------------------
  //  👤 Validación de usuario en el login
  // -----------------------------------------------------------------------
  async validateUser(login: string, contrasena: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: [{ email: login }, { nombreDeUsuario: login }],
      relations: ['rol'],
    });

    if (!usuario) return null;

    if (!usuario.verificado) {
      throw new HttpException(
        'Tu cuenta aún no ha sido verificada. Revisa tu correo electrónico.',
        HttpStatus.FORBIDDEN,
      );
    }

    const passwordOK = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!passwordOK) return null;

    const { contrasena: _, ...usuarioSinContrasena } = usuario;
    return usuarioSinContrasena;
  }

  // -----------------------------------------------------------------------
  //  🧩 Asignar rol después del login
  // -----------------------------------------------------------------------
  async asignarRol(idUsuario: number, idRol: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: { idUsuario },
      relations: ['rol'],
    });

    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    usuario.rol = { idRol } as any;
    await this.usuarioRepository.save(usuario);

    const { contrasena, ...usuarioSinContrasena } = usuario;
    return usuarioSinContrasena;
  }

  // -----------------------------------------------------------------------
  //  🔑 Generar Token JWT
  // -----------------------------------------------------------------------
  generateToken(usuario: any) {
    const payload = {
      sub: usuario.idUsuario,
      rol: usuario.rol?.idRol,
    };

    return this.jwtService.sign(payload);
  }
}
