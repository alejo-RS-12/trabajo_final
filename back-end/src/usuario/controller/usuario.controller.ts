import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { UsuarioService } from '../service/usuario.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { AddFavoritoDto, RemoveFavoritoDto } from '../dto/favoritos.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtAuthGuard } from '../../auth/service/jwt-auth.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // Público
  @Post()
  crearUsuario(@Body() body: any) {
    return this.usuarioService.crearUsuarioConRol(body);
  }

  // Público
  @Post('register')
  register(@Body() body: RegisterUserDto) {
    return this.usuarioService.register(body);
  }

  // Público
  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.usuarioService.login(body.email, body.contrasena);
  }

  // Protegido
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  // Protegido
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  // Protegido
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  // Protegido
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }

  // Favoritos -> Protegido
  @UseGuards(JwtAuthGuard)
  @Post(':id/favoritos')
  addFavorito(@Param('id') idUsuario: number, @Body() dto: AddFavoritoDto) {
    return this.usuarioService.agregarFavorito(idUsuario, dto.idPublicacion);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/favoritos')
  removeFavorito(@Param('id') idUsuario: number, @Body() dto: RemoveFavoritoDto) {
    return this.usuarioService.quitarFavorito(idUsuario, dto.idPublicacion);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/favoritos')
  getFavoritos(@Param('id') idUsuario: number) {
    return this.usuarioService.obtenerFavoritos(idUsuario);
  }
}
