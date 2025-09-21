import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express'; // 👈 importar Request

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {
    // Este endpoint redirige a Google, no devuelve nada
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request) {
    // Acá recibís los datos de Google después del login
    return {
      message: 'Login con Google exitoso',
      user: req.user, // 👈 ya no marca error
    };
  }
}
