import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfesionDto } from './dto/create-profesion.dto';
import { UpdateProfesionDto } from './dto/update-profesion.dto';
import { Profesion } from './entities/profesion.entity';

@Injectable()
export class ProfesionService {
  constructor(
    @InjectRepository(Profesion)
    private readonly profesionRepository: Repository<Profesion>,
  ) {}
  create(createProfesionDto: CreateProfesionDto): Promise<Profesion> {
    let profesion = this.profesionRepository.create(createProfesionDto);
    return this.profesionRepository.save(profesion);
  }

  findAll(): Promise<Profesion[]> {
    return this.profesionRepository.find();
  }

  findOne(id: number) {
    return this.profesionRepository.findOneBy({ idProfesion: id });
  }

  update(id: number, updateProfesionDto: UpdateProfesionDto) {
    return `This action updates a #${id} profesion`;
  }

  remove(id: number) {
    return `This action removes a #${id} profesion`;
  }
}
