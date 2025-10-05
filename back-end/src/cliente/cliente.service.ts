import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { Usuario } from '../usuario/entities/usuario.entity';

import { UpdateClienteDto } from './dto/update-cliente.dto';

let ROL_CLIENTE = 2;

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente) private clienteRepo: Repository<Cliente>,
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
  ) {}

  async create(idUsuario: number): Promise<Cliente> {
    let usuario = await this.usuarioRepo.findOne({
      where: { idUsuario },
      relations: ['rol', 'cliente'],
    });
    if (!usuario) throw new NotFoundException(`Usuario ${idUsuario} no existe`);
    if (!usuario.rol || usuario.rol.idRol !== ROL_CLIENTE) {
      throw new BadRequestException(
        `El usuario ${idUsuario} no tiene rol Cliente`,
      );
    }
    if (usuario.cliente) {
      throw new BadRequestException(`El usuario ${idUsuario} ya es Cliente`);
    }
    const cliente = this.clienteRepo.create({ usuario });
    return this.clienteRepo.save(cliente);
  }

  // findAll(): Promise<Cliente[]> {
  //   return this.clienteRepo.find({ relations: ['usuario'] });
  // }
  findAll() {
    return this.clienteRepo.find({
      relations: ['usuario', 'usuario.rol'], // también trae el rol del usuario si quieres
    });
  }

  // async findOne(idCliente: number): Promise<Cliente> {
  //   let cli = await this.clienteRepo.findOne({
  //     where: { idCliente },
  //     relations: ['usuario'],
  //   });
  //   if (!cli) throw new NotFoundException(`Cliente ${idCliente} no encontrado`);
  //   return cli;
  // }
  findOne(id: number) {
    return this.clienteRepo.findOne({
      where: { idCliente: id },
      relations: ['usuario', 'usuario.rol'],
    });
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
