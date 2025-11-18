import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateUsuarioDto } from '../../usuario/dto/create-usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * ✅ Registro de usuario + envío de email de verificación
   */
  @Post('register')
  async register(@Body() createUserDto: CreateUsuarioDto) {
    return this.authService.register(createUserDto);
  }

  /**
   * ✅ Verificación de cuenta mediante token recibido por correo
   * Ejemplo de uso: GET /auth/verify?token=abc123
   */
  @Get('verify')
  async verifyAccount(@Query('token') token: string) {
    return this.authService.verifyAccount(token);
  }

  /**
   * ✅ Login tradicional
   * Si el usuario no tiene rol asignado, se indica al frontend que debe elegir uno.
   */
  @Post('login')
  async login(@Body() body: { nombreDeUsuario: string; contrasena: string }) {
    const usuario = await this.authService.validateUser(
      body.nombreDeUsuario,
      body.contrasena,
    );

    if (!usuario) {
      throw new HttpException(
        'Usuario o contraseña incorrectos',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Si no tiene rol asignado → obligatorio elegir
    if (!usuario.rol) {
      return {
        message: 'Primera vez iniciando sesión. Debes elegir tu rol.',
        needsRoleSelection: true,
        userId: usuario.idUsuario,
      };
    }

    // 🔥 Generamos token JWT
    const token = this.authService.generateToken(usuario);

    return {
      message: 'Login exitoso',
      token,
      user: usuario,
    };
  }

  /**
   * ✅ Asignación de rol al usuario después del login
   * Ejemplo: POST /auth/asignar-rol { idUsuario: 1, idRol: 2 }
   */
  @Post('asignar-rol')
  async asignarRol(@Body() body: { idUsuario: number; idRol: number }) {
    if (!body.idUsuario || !body.idRol) {
      throw new HttpException(
        'Datos incompletos: idUsuario e idRol son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const usuarioActualizado = await this.authService.asignarRol(
      body.idUsuario,
      body.idRol,
    );

    return {
      message: 'Rol asignado correctamente',
      user: usuarioActualizado,
    };
  }
}
