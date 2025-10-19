import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MensajeService } from './mensaje.service';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { UpdateMensajeDto } from './dto/update-mensaje.dto';

@Controller('mensaje')
export class MensajeController {
  constructor(private readonly mensajeService: MensajeService) {}

  @Post()
  create(@Body() createMensajeDto: CreateMensajeDto) {
    return this.mensajeService.create(createMensajeDto);
  }

  @Get()
  findAll() {
    return this.mensajeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mensajeService.findOne(+id);
  }

  @Get('conversacion/:idEmisor/:idReceptor')
  findConversacion(
    @Param('idEmisor') idEmisor: number,
    @Param('idReceptor') idReceptor: number,
  ) {
    return this.mensajeService.findConversacion(idEmisor, idReceptor);
  }
  
  @Get('conversaciones/:idUsuario')
  findConversaciones(@Param('idUsuario') idUsuario: number) {
  return this.mensajeService.findConversaciones(idUsuario);
}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMensajeDto: UpdateMensajeDto) {
    return this.mensajeService.update(+id, updateMensajeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mensajeService.remove(+id);
  }
}
