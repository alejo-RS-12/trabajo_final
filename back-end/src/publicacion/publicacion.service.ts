import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publicacion, EstadoPublicacion } from './entities/publicacion.entity';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { Profesional } from 'src/profesional/entities/profesional.entity';
import  { ILike } from 'typeorm'

@Injectable()
export class PublicacionService {
  constructor(
    @InjectRepository(Publicacion)
    private readonly publicacionRepository: Repository<Publicacion>,
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
      relations: ['profesional'],
    });
  }

  async findOne(id: number) {
      return await this.publicacionRepository.findOne({
      where: { idPublicacion: id },
      relations: ['profesional'],
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

// async buscarPorTitulo(titulo: string): Promise<Publicacion[]> {
//   // dividimos el string en palabras (separadas por espacios)
//   const palabras = titulo.split(" ").filter(p => p.trim() !== "");

//   return this.publicacionRepository.find({
//     where: palabras.map(p => ({
//       titulo: ILike(`%${p}%`),
//       relations: ['profesional', 'profesional.usuario'],
//     })),
//   });
// }

  async update(id: number, dto: UpdatePublicacionDto, files?: Express.Multer.File[]) {
  const publicacion = await this.publicacionRepository.findOne({ where: { idPublicacion: id } });
  if (!publicacion) throw new Error("Publicación no encontrada");

  // Si hay imágenes nuevas
  if (files && files.length > 0) {
    dto.imagenes = files.map(f => `/uploads/publicaciones/${f.filename}`);
  }

  // Si viene idProfesional, asignar relación
  if (dto.idProfesional) {
    publicacion.profesional = { idProfesional: dto.idProfesional } as Profesional;
    delete dto.idProfesional; // 👈 para que no choque con TypeORM
  }

  Object.assign(publicacion, dto);
  return this.publicacionRepository.save(publicacion);
}

  async remove(id: number) {
    return await this.publicacionRepository.delete(id);
  }
}
