import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Profesional } from './profesional.entity';
import { Profesion } from '../../profesion/entities/profesion.entity';

@Entity('profesionalprofesion')
export class ProfesionalProfesion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profesional, (profesional) => profesional.profesiones, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idProfesional' })
  profesional: Profesional;

  @ManyToOne(() => Profesion, (profesion) => profesion.profesionales, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idProfesion' })
  profesion: Profesion;
}
