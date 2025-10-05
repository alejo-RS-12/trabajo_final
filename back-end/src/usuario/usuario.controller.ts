import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AddFavoritoDto, RemoveFavoritoDto } from './dto/favoritos.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async crearUsuario(@Body() body: any) {
    return this.usuarioService.crearUsuarioConRol(body);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }

@Post(':id/favoritos')
  addFavorito(
    @Param('id') idUsuario: number,
    @Body() dto: AddFavoritoDto,
  ) {
    return this.usuarioService.agregarFavorito(idUsuario, dto.idPublicacion);
  }

  @Delete(':id/favoritos')
  removeFavorito(
    @Param('id') idUsuario: number,
    @Body() dto: RemoveFavoritoDto,
  ) {
    return this.usuarioService.quitarFavorito(idUsuario, dto.idPublicacion);
  }

  @Get(':id/favoritos')
  getFavoritos(@Param('id') idUsuario: number) {
    return this.usuarioService.obtenerFavoritos(idUsuario);
  }

}
