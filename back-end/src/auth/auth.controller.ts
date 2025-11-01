import { Controller, Post, Body, HttpException, HttpStatus, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express'; // 👈 importar Request

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login tradicional

  @Post('login')
  async login(@Body() body: { nombreDeUsuario: string; contrasena: string }) {
    const usuario = await this.authService.validateUser(body.nombreDeUsuario, body.contrasena);
    if (!usuario) {
      throw new HttpException('Usuario o contraseña incorrectos', HttpStatus.UNAUTHORIZED);
    }
    return usuario; // Devuelve datos del usuario (sin contraseña)
  }


// Login con Google

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {
    // Este endpoint redirige a Google, no devuelve nada
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request & { user?: any }) { //agregue del & en adelante por que me tiraba error en req.user
    // Acá recibís los datos de Google después del login
    return {
      message: 'Login con Google exitoso',
      user: req.user, // 👈 ya no marca error
    };
  }
}