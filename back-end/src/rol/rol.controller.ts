import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';

@Controller('roles')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  // 👉 Crear un rol
  @Post()
  create(@Body() createRolDto: CreateRolDto) {
    return this.rolService.crear(createRolDto.nombreRol);
  }

  // 👉 Listar todos los roles
  @Get()
  findAll() {
    return this.rolService.listar();
  }

  // 👉 Obtener un rol por ID
  @Get(':idRol')
  findOne(@Param('idRol') idRol: number) {
    return this.rolService.obtenerUno(Number(idRol));
  }

  // 👉 Actualizar un rol
  @Put(':idRol')
  update(@Param('idRol') idRol: number, @Body() createRolDto: CreateRolDto) {
    return this.rolService.actualizar(Number(idRol), createRolDto.nombreRol);
  }

  // 👉 Eliminar un rol
  @Delete(':idRol')
  remove(@Param('idRol') idRol: number) {
    return this.rolService.eliminar(Number(idRol));
  }
}


// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   NotFoundException,
// } from '@nestjs/common';
// import { RolService } from './rol.service';
// import { CreateRolDto } from './dto/create-rol.dto';
// import { UpdateRolDto } from './dto/update-rol.dto';
// import { Rol } from './entities/rol.entity';

// @Controller('rol')
// export class RolController {
//   constructor(private readonly rolService: RolService) {}

//   @Post()
//   create(@Body() createRolDto: CreateRolDto) {
//     return this.rolService.create(createRolDto);
//   }

//   @Get()
//   findAll(): Promise<Rol[]> {
//     return this.rolService.findAll();
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string): Promise<Rol> {
//     const rol = await this.rolService.findOne(+id);
//     if (!rol) {
//       throw new NotFoundException(`Rol con id ${id} no encontrado`);
//     }
//     return rol;
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateRolDto: UpdateRolDto) {
//     return this.rolService.update(+id, updateRolDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.rolService.remove(+id);
//   }
// }
