import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Profesional } from '../../profesional/entities/profesional.entity';
import { Calificacion } from '../../calificacion/entities/calificacion.entity';

export enum EstadoPublicacion {
  ACTIVA = 'activa',
  PAUSADA = 'pausada',
  FINALIZADA = 'finalizada',
}

@Entity('publicacion')
export class Publicacion {
  @PrimaryGeneratedColumn()
  idPublicacion: number;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'text', nullable: true })
  ubicacion?: string;

  @Column({ type: 'simple-array', nullable: true })
  imagenes?: string[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fechaPublicacion: Date;

  @Column({
    type: 'enum',
    enum: EstadoPublicacion,
    default: EstadoPublicacion.ACTIVA,
  })
  estado: EstadoPublicacion;

  // Relación con Profesional
  @ManyToOne(() => Profesional, (profesional) => profesional.publicaciones, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idProfesional' })
  profesional: Profesional;

  // Relación con Calificaciones
  @OneToMany(() => Calificacion, (calificacion) => calificacion.publicacion)
  calificaciones: Calificacion[];
}
