import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { nombreDeUsuario: string; contrasena: string }) {
    const usuario = await this.authService.validateUser(body.nombreDeUsuario, body.contrasena);
    if (!usuario) {
      throw new HttpException('Usuario o contraseña incorrectos', HttpStatus.UNAUTHORIZED);
    }
    return usuario; // Devuelve datos del usuario (sin contraseña)
  }
}