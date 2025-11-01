import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepo: Repository<Rol>,
  ) {}

  // 👉 Crear un rol
  async crear(nombreRol: string) {
    const existe = await this.rolRepo.findOne({ where: { nombreRol } });
    if (existe) {
      throw new BadRequestException(`El rol "${nombreRol}" ya existe`);
    }

    const nuevoRol = this.rolRepo.create({ nombreRol });
    return await this.rolRepo.save(nuevoRol);
  }

  // 👉 Listar todos los roles
  async listar() {
    return await this.rolRepo.find();
  }

  // 👉 Buscar un rol por ID
  async obtenerUno(idRol: number) {
    const rol = await this.rolRepo.findOne({ where: { idRol } });
    if (!rol) {
      throw new NotFoundException(`Rol con ID ${idRol} no encontrado`);
    }
    return rol;
  }

  // 👉 Actualizar un rol
  async actualizar(idRol: number, nombreRol: string) {
    const rol = await this.obtenerUno(idRol); // lanza NotFound si no existe
    rol.nombreRol = nombreRol;
    return await this.rolRepo.save(rol);
  }

  // 👉 Eliminar un rol
  async eliminar(idRol: number) {
    const rol = await this.obtenerUno(idRol); // lanza NotFound si no existe
    await this.rolRepo.remove(rol);
    return { message: `Rol con ID ${idRol} eliminado correctamente` };
  }
}



// import { Injectable } from '@nestjs/common';
// import { CreateRolDto } from './dto/create-rol.dto';
// import { UpdateRolDto } from './dto/update-rol.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Rol } from './entities/rol.entity';

// @Injectable()
// export class RolService {
//   constructor(
//     @InjectRepository(Rol)
//     private rolRepository: Repository<Rol>,
//   ) {}

//   async findAll(): Promise<Rol[]> {
//     return this.rolRepository.find();
//   }

//   async findOne(id: number): Promise<Rol | null> {
//     return this.rolRepository.findOneBy({ idRol: id });
//   }

//   async create(createRolDto: CreateRolDto): Promise<Rol> {
//     const rol = this.rolRepository.create(createRolDto);
//     return this.rolRepository.save(rol);
//   }

//   update(id: number, updateRolDto: UpdateRolDto) {
//     return this.rolRepository.update(id, updateRolDto);
//   }

//   remove(id: number) {
//     return `This action removes a #${id} rol`;
//   }
// }
