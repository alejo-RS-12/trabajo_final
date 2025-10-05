import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Req, Query  } from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Publicacion } from './entities/publicacion.entity';

@Controller('publicacion')
export class PublicacionController {
  constructor(private readonly publicacionService: PublicacionService) {}

 // Crear publicación
  @Post()
  @UseInterceptors(FilesInterceptor('imagenes', 10, {
    storage: diskStorage({
      destination: './uploads/publicaciones',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
      },
    }),
  }))
  async create(@Req() req: any, @UploadedFiles() files?: Express.Multer.File[]) {
    const dto = req.body as unknown as CreatePublicacionDto;

    // Convertir idProfesional a number (viene de FormData como string)
     dto.idProfesional = Number(dto.idProfesional);
    return this.publicacionService.create(dto, files);
    };
   

  @Get("profesional/:id")
  findByProfesional(@Param("id") id: number) {
   return this.publicacionService.findByProfesional(id);
  }

  @Get()
  findAll() {
    return this.publicacionService.findAll();
  }

 
  @Get('buscar')
  async buscarPorTitulo(
    @Query('titulo') titulo: string,
  ): Promise<Publicacion[]> {
    if (!titulo || titulo.trim() === '') return [];
    return this.publicacionService.buscarPorTitulo(titulo);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicacionService.findOne(+id);
  }


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePublicacionDto: UpdatePublicacionDto) {
  //   return this.publicacionService.update(+id, updatePublicacionDto);
  // }
    @Patch(':id')
  @UseInterceptors(FilesInterceptor('imagenes', 10, {
    storage: diskStorage({
      destination: './uploads/publicaciones',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
      },
    }),
  }),
)
  async update(
    @Param('id') id: string,
    @Req() req: any,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const dto = req.body as UpdatePublicacionDto;
    // dto.idProfesional = Number(dto.idProfesional);

    return this.publicacionService.update(Number(id), dto , files);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicacionService.remove(+id);
  }
}


