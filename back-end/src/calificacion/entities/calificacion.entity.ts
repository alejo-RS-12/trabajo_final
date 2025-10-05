import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Publicacion } from '../../publicacion/entities/publicacion.entity';
import { Cliente } from '../../cliente/entities/cliente.entity';

@Entity('calificacion')
export class Calificacion {
  @PrimaryGeneratedColumn()
  idCalificacion: number;

  @Column({ type: 'tinyint' })
  puntuacion: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  // Relación con Publicación
  @ManyToOne(() => Publicacion, (publicacion) => publicacion.calificaciones, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idPublicacion' })
  publicacion: Publicacion;

  // Relación con Cliente
  @ManyToOne(() => Cliente, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idCliente' })
  cliente: Cliente;
}
