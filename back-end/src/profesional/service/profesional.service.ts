import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesional } from '../entities/profesional.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Profesion } from '../../profesion/entities/profesion.entity';
import { ProfesionalProfesion } from '../entities/profesionalprofesion.entity';
import { CreateProfesionalDto } from '../dto/create-profesional.dto';
import { UpdateProfesionalDto } from '../dto/update-profesional.dto';

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
  ) { }

  // ---------------------------------------------------------------
  // Crear profesional
  // ---------------------------------------------------------------
  async create(dto: CreateProfesionalDto): Promise<Profesional> {
    const usuario = await this.usuarioRepo.findOne({
      where: { idUsuario: dto.idUsuario },
      relations: ['rol', 'profesional'],
    });

    if (!usuario)
      throw new NotFoundException(`Usuario ${dto.idUsuario} no existe`);

    if (!usuario.rol || usuario.rol.idRol !== ROL_PROFESIONAL)
      throw new BadRequestException(
        `El usuario ${dto.idUsuario} no posee el rol Profesional`,
      );

    if (usuario.profesional)
      throw new BadRequestException(`El usuario ya tiene un perfil profesional`);

    // Crear entidad Profesional correctamente (UN OBJETO, no array)
    const profesional = this.profesionalRepo.create({
      
      usuario,
      matricula: dto.matricula,
      descripcion: dto.descripcion,
      calificacionPromedio: 0,
    });
  

    const saved = await this.profesionalRepo.save(profesional);

    // Asignar profesiones si vienen en el DTO
    if (dto.profesionesIds?.length) {
      await this.asignarProfesiones(saved.idProfesional, dto.profesionesIds);
    }

    return this.findOne(saved.idProfesional);
  }

  // ---------------------------------------------------------------
  // Listar todos
  // ---------------------------------------------------------------
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

  // ---------------------------------------------------------------
  // Buscar por ID
  // ---------------------------------------------------------------
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

  // ---------------------------------------------------------------
  // Buscar por ID de usuario
  // ---------------------------------------------------------------
  findByUsuario(idUsuario: number) {
    return this.profesionalRepo.findOne({
      where: { usuario: { idUsuario } },
      relations: ['usuario', 'profesiones'],
    });
  }

  // ---------------------------------------------------------------
  // Actualizar profesional (solo profesional)
  // ---------------------------------------------------------------
  async update(
    id: number,
    dto: UpdateProfesionalDto,
  ): Promise<Profesional> {
    const profesional = await this.profesionalRepo.findOne({
      where: { idProfesional: id },
      relations: ['usuario'],
    });

    if (!profesional)
      throw new NotFoundException(`Profesional ${id} no encontrado`);

    Object.assign(profesional, dto);

    const saved = await this.profesionalRepo.save(profesional);

    if (dto.profesionesIds?.length) {
      await this.asignarProfesiones(id, dto.profesionesIds);
    }

    return this.findOne(id);
  }

  // ---------------------------------------------------------------
  // Eliminar profesional
  // ---------------------------------------------------------------
  async remove(id: number): Promise<void> {
    const profesional = await this.profesionalRepo.findOne({
      where: { idProfesional: id },
      relations: ['profesiones', 'publicaciones'],
    });

    if (!profesional)
      throw new NotFoundException(`Profesional ${id} no encontrado`);

    await this.ppRepo.delete({ profesional: { idProfesional: id } });

    if (profesional.publicaciones?.length) {
      await this.profesionalRepo.manager
        .getRepository('publicacion')
        .delete({ profesional: { idProfesional: id } });
    }

    await this.profesionalRepo.remove(profesional);
  }

  // ---------------------------------------------------------------
  // Asignar profesiones
  // ---------------------------------------------------------------
  async asignarProfesiones(profesionalId: number, ids: number[]) {
    const profesional = await this.profesionalRepo.findOne({
      where: { idProfesional: profesionalId },
    });

    if (!profesional)
      throw new NotFoundException('Profesional no encontrado');

    // Borrar relaciones actuales
    await this.ppRepo.delete({ profesional: { idProfesional: profesionalId } });

    // Crear nuevas relaciones (UN OBJETO por cada una)
    const relaciones = ids.map((idProfesion) =>
      this.ppRepo.create({
        profesional,
        profesion: { idProfesion },
      }),
    );

    return this.ppRepo.save(relaciones);
  }
}
