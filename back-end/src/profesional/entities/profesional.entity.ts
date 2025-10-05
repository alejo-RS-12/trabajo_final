import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Publicacion } from '../../publicacion/entities/publicacion.entity';
import { ProfesionalProfesion } from './profesionalprofesion.entity';

@Entity('Profesional')
export class Profesional {
  @PrimaryGeneratedColumn()
  idProfesional: number;

  @Column({ length: 50, nullable: true })
  matricula?: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  calificacionPromedio: number;

  @OneToOne(() => Usuario, (usuario) => usuario.profesional, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;

  @OneToMany(() => Publicacion, (publicacion) => publicacion.profesional)
  publicaciones: Publicacion[];

  @OneToMany(() => ProfesionalProfesion, (pp) => pp.profesional, {
    cascade: true,
  })
  profesiones: ProfesionalProfesion[];
}
