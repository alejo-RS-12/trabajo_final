import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProfesionalProfesion } from '../../profesional/entities/profesionalprofesion.entity';

@Entity('profesion')
export class Profesion {
  @PrimaryGeneratedColumn()
  idProfesion: number;

  @Column({ length: 100, unique: true })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  // Relación con tabla intermedia
  @OneToMany(() => ProfesionalProfesion, (pp) => pp.profesion)
  profesionales: ProfesionalProfesion[];
}
