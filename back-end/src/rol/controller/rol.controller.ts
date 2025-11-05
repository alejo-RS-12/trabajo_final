import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RolService } from '../service/rol.service';
import { CreateRolDto } from '../dto/create-rol.dto';

@Controller('roles')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  // Crear un rol
  @Post()
  create(@Body() createRolDto: CreateRolDto) {
    return this.rolService.crear(createRolDto.nombreRol);
  }

  // Listar todos los roles
  @Get()
  findAll() {
    return this.rolService.listar();
  }

  // Obtener un rol por ID
  @Get(':idRol')
  findOne(@Param('idRol') idRol: number) {
    return this.rolService.obtenerUno(Number(idRol));
  }

  // Actualizar un rol
  @Put(':idRol')
  update(@Param('idRol') idRol: number, @Body() createRolDto: CreateRolDto) {
    return this.rolService.actualizar(Number(idRol), createRolDto.nombreRol);
  }

  // Eliminar un rol
  @Delete(':idRol')
  remove(@Param('idRol') idRol: number) {
    return this.rolService.eliminar(Number(idRol));
  }
}

