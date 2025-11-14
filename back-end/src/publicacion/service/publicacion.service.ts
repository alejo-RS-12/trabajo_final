import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publicacion, EstadoPublicacion } from '../entities/publicacion.entity';
import { CreatePublicacionDto } from '../dto/create-publicacion.dto';
import { UpdatePublicacionDto } from '../dto/update-publicacion.dto';
import { Profesional } from 'src/profesional/entities/profesional.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PublicacionService {
  constructor(
    @InjectRepository(Publicacion)
    private readonly publicacionRepository: Repository<Publicacion>,
    @InjectRepository(Profesional)
    private readonly profesionalRepository: Repository<Profesional>,
  ) {}

  async create(dto: CreatePublicacionDto, files?: Express.Multer.File[]) {
  const rutas = files?.map(file => `/uploads/publicaciones/${file.filename}`) ?? [];

  const publicacion = this.publicacionRepository.create({
    titulo: dto.titulo,
    descripcion: dto.descripcion,
    ubicacion: dto.ubicacion,
    imagenes: rutas, // array
    estado: dto.estado ?? EstadoPublicacion.ACTIVA,
    profesional: { idProfesional: dto.idProfesional } as Partial<Profesional>,
  });

  return await this.publicacionRepository.save(publicacion);
}

async findByProfesional(idProfesional: number) {
  return await this.publicacionRepository.find({
    where: { profesional: { idProfesional } },
    relations: ["profesional", "profesional.usuario"],
  });
}

  findAll() {
    return this.publicacionRepository.find({
      relations: ['profesional', "profesional.usuario"],
    });
  }

  async findOne(id: number) {
      return await this.publicacionRepository.findOne({
      where: { idPublicacion: id },
      relations: ['profesional', "profesional.usuario"],
    });
  }

async buscarPorTitulo(titulo: string): Promise<Publicacion[]> {
  const palabras = titulo.split(" ").filter(p => p.trim() !== "");

  const query = this.publicacionRepository
    .createQueryBuilder("publicacion")
    .leftJoinAndSelect("publicacion.profesional", "profesional")
    .leftJoinAndSelect("profesional.usuario", "usuario");

  palabras.forEach((p, index) => {
    query.orWhere(`publicacion.titulo LIKE :palabra${index}`, {
      [`palabra${index}`]: `%${p}%`,
    });
  });

  return await query.getMany();
}

  async update(id: number, dto: any, files?: Express.Multer.File[]) {
    const publicacion = await this.publicacionRepository.findOne({
      where: { idPublicacion: id },
    });

    if (!publicacion) throw new NotFoundException('Publicación no encontrada');

    // Parsear imágenes existentes enviadas desde el frontend
    let imagenesExistentes: string[] = [];
    if (dto.imagenesExistentes) {
      try {
        imagenesExistentes = JSON.parse(dto.imagenesExistentes);
      } catch {
        imagenesExistentes = [];
      }
    }

    // Generar rutas de nuevas imágenes subidas
    const nuevas = files?.map(f => `/uploads/publicaciones/${f.filename}`) ?? [];

    // Combinar las existentes con las nuevas
    const nuevasImagenes = [...imagenesExistentes, ...nuevas];

    // Eliminar archivos que estaban antes y ya no se conservaron
    const carpetaUploads = path.resolve(process.cwd(), 'uploads', 'publicaciones');
    const imagenesViejas = publicacion.imagenes || [];

    for (const img of imagenesViejas) {
      if (!nuevasImagenes.includes(img)) {
        const rutaArchivo = path.join(carpetaUploads, path.basename(img));
        if (fs.existsSync(rutaArchivo)) {
          try {
            fs.unlinkSync(rutaArchivo);
            console.log(`🗑️ Imagen eliminada: ${rutaArchivo}`);
          } catch (err) {
            console.error(`❌ Error al eliminar ${rutaArchivo}:`, err);
          }
        }
      }
    }

    // Actualizar campos del objeto
    publicacion.titulo = dto.titulo ?? publicacion.titulo;
    publicacion.descripcion = dto.descripcion ?? publicacion.descripcion;
    publicacion.ubicacion = dto.ubicacion ?? publicacion.ubicacion;
    publicacion.estado = dto.estado ?? publicacion.estado;
    publicacion.imagenes = nuevasImagenes;

    // Reasignar profesional si viene en el DTO
    if (dto.idProfesional) {
      publicacion.profesional = { idProfesional: dto.idProfesional } as Profesional;
    }

    // Guardar cambios en la base de datos
    return await this.publicacionRepository.save(publicacion);
  }



async calificarPublicacion(idPublicacion: number, puntuacion: number) {
  const publicacion = await this.publicacionRepository.findOne({
    where: { idPublicacion },
    relations: ['profesional'],
  });

  if (!publicacion) throw new NotFoundException('Publicación no encontrada');

  const profesional = publicacion.profesional;

  // Si no tiene calificaciones aún
  const cantidadActual = profesional.cantidadCalificaciones || 0;
  const promedioActual = Number(profesional.calificacionPromedio) || 0;

  // Nuevo promedio ponderado
  const nuevaCantidad = cantidadActual + 1;
  const nuevoPromedio = ((promedioActual * cantidadActual) + puntuacion) / nuevaCantidad;

  // Guardar
  profesional.cantidadCalificaciones = nuevaCantidad;
  profesional.calificacionPromedio = nuevoPromedio;

  await this.profesionalRepository.save(profesional);

  return { calificacionPromedio: nuevoPromedio };
}

  async remove(id: number) {
    // Busca la publicación antes de eliminarla
  const publicacion = await this.publicacionRepository.findOne({
    where: { idPublicacion: id },
  });

  if (!publicacion) throw new NotFoundException('Publicación no encontrada');

  // Elimina imágenes asociadas en el sistema de archivos
  const carpetaUploads = path.resolve(process.cwd(), 'uploads', 'publicaciones');

  if (publicacion.imagenes && publicacion.imagenes.length > 0) {
    for (const img of publicacion.imagenes) {
      const rutaArchivo = path.join(carpetaUploads, path.basename(img));
      if (fs.existsSync(rutaArchivo)) {
        try {
          fs.unlinkSync(rutaArchivo);
          console.log(`🗑️ Imagen eliminada al borrar publicación: ${rutaArchivo}`);  
        } catch (err) {
          console.error(`❌ Error al eliminar imagen ${rutaArchivo}:`, err);
        }
      }
    }
  }

  // Elimina el registro de la base de datos
  await this.publicacionRepository.delete(id);

  return { message: 'Publicación y sus imágenes eliminadas correctamente' }; 
}
}
