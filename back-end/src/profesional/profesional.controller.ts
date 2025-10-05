import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProfesionalService } from './profesional.service';
import { CreateProfesionalDto } from './dto/create-profesional.dto';
import { UpdateProfesionalDto } from './dto/update-profesional.dto';
import { Profesional } from './entities/profesional.entity';

@Controller('profesional')
export class ProfesionalController {
  constructor(private readonly profesionalService: ProfesionalService) {}

  @Post()
  create(@Body() createDto: CreateProfesionalDto): Promise<Profesional> {
    return this.profesionalService.create(createDto);
  }

  @Get()
  findAll(): Promise<Profesional[]> {
    return this.profesionalService.findAll();
  }
// busca por idProfesional
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.profesionalService.findOne(id);
  }
// busca por idUsuario, si no sabemos el idProfesional.
  @Get("usuario/:idUsuario")
  findByUsuario(@Param("idUsuario") idUsuario: number) {
    return this.profesionalService.findByUsuario(+idUsuario);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateProfesionalDto,
  ) {
    return this.profesionalService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.profesionalService.remove(id);
  }

  @Post(':id/asignar-profesiones')
  asignarProfesiones(
    @Param('id', ParseIntPipe) id: number,
    @Body('idsProfesion') idsProfesion: number[],
  ) {
    return this.profesionalService.asignarProfesiones(id, idsProfesion);
  }
}
