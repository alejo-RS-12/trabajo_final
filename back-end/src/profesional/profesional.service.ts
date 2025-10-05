import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesional } from './entities/profesional.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Profesion } from '../profesion/entities/profesion.entity';
import { ProfesionalProfesion } from './entities/profesionalprofesion.entity';
import { CreateProfesionalDto } from './dto/create-profesional.dto';
import { UpdateProfesionalDto } from './dto/update-profesional.dto';

const ROL_PROFESIONAL = 3;

@Injectable()
export class ProfesionalService {
  constructor(
    @InjectRepository(Profesional)
    private profesionalRepo: Repository<Profesional>,

    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,

    @InjectRepository(Profesion)
    private profesionRepo: Repository<Profesion>,

    @InjectRepository(ProfesionalProfesion)
    private ppRepo: Repository<ProfesionalProfesion>,
  ) {}
// Crear nuevo profesional
  async create(dto: CreateProfesionalDto): Promise<Profesional> {
    const usuario = await this.usuarioRepo.findOne({
      where: { idUsuario: dto.idUsuario },
      relations: ['rol', 'profesional'],
    });
// Validar usuario
    if (!usuario)
      throw new NotFoundException(`Usuario ${dto.idUsuario} no existe`);

    if (!usuario.rol || usuario.rol.idRol !== ROL_PROFESIONAL) {
      throw new BadRequestException(
        `El usuario ${dto.idUsuario} no tiene rol Profesional`,
      );
    }

    if (usuario.profesional)
      throw new BadRequestException(`Usuario ya es Profesional`);

    // Crear profesional 
    const profesional = this.profesionalRepo.create({
      usuario,
      matricula: dto.matricula,
      descripcion: dto.descripcion,
      calificacionPromedio: 0, 
    });

    const savedProfesional = await this.profesionalRepo.save(profesional);

    // Asignar profesiones 
    if (dto.profesionesIds && dto.profesionesIds.length) {
      await this.asignarProfesiones(
        savedProfesional.idProfesional,
        dto.profesionesIds,
      );
    }

    return this.findOne(savedProfesional.idProfesional);
  }
// Listar todos los profesionales
  findAll() {
    return this.profesionalRepo.find({
      relations: [
        'usuario',
        'usuario.rol',
        'profesiones',
        'profesiones.profesion',
      ],
    });
  }
// Buscar profesional por ID
  async findOne(id: number) {
    const profesional = await this.profesionalRepo.findOne({
      where: { idProfesional: id },
      relations: [
        'usuario',
        'usuario.rol',
        'profesiones',
        'profesiones.profesion',
      ],
    });

    if (!profesional)
      throw new NotFoundException(`Profesional ${id} no encontrado`);
    return profesional;
  }
// Buscar profesional por ID de usuario
  async findByUsuario(idUsuario: number) {
  return this.profesionalRepo.findOne({
    where: { usuario: { idUsuario } },
    relations: ["usuario", "profesiones"], 
  });
}

// Actualizar profesional y sus profesiones
  async update(id: number, dto: UpdateProfesionalDto): Promise<Profesional> {
    const profesional = await this.findOne(id);
    if (dto.calificacionPromedio !== undefined) {
      profesional.calificacionPromedio = Number(dto.calificacionPromedio);
    }
    if (dto.matricula !== undefined) profesional.matricula = dto.matricula;
    if (dto.descripcion !== undefined)
      profesional.descripcion = dto.descripcion;

    await this.profesionalRepo.save(profesional);

    // Actualizar profesiones si se proporcionan IDs
    if (dto.profesionesIds) {
      await this.asignarProfesiones(
        profesional.idProfesional,
        dto.profesionesIds,
      );
    }

    return this.findOne(profesional.idProfesional);
  }
// Eliminar profesional y sus relaciones
  async remove(id: number): Promise<void> {
    const profesional = await this.profesionalRepo.findOne({
      where: { idProfesional: id },
      relations: ['profesiones', 'publicaciones'],
    });

    if (!profesional) {
      throw new NotFoundException(`Profesional ${id} no encontrado`);
    }

    // Borrar relaciones intermedias
    if (profesional.profesiones && profesional.profesiones.length) {
      await this.ppRepo.delete({ profesional: { idProfesional: id } });
    }

    // Borrar publicaciones asociadas
    if (profesional.publicaciones && profesional.publicaciones.length) {
      await this.profesionalRepo.manager
        .getRepository('publicacion')
        .delete({ profesional: { idProfesional: id } });
    }

    await this.profesionalRepo.remove(profesional);
  }
// Asignar profesiones a un profesional
  async asignarProfesiones(profesionalId: number, idsProfesion: number[]) {
    const profesional = await this.profesionalRepo.findOne({
      where: { idProfesional: profesionalId },
    });
    if (!profesional) throw new NotFoundException('Profesional no encontrado');

    // Primero eliminar relaciones existentes
    await this.ppRepo.delete({ profesional: { idProfesional: profesionalId } });

    // Crear nuevas relaciones
    const relaciones = idsProfesion.map((id) =>
      this.ppRepo.create({
        profesional,
        profesion: { idProfesion: id },
      }),
    );

    return this.ppRepo.save(relaciones);
  }
}
