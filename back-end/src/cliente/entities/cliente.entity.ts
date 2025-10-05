import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Calificacion } from '../../calificacion/entities/calificacion.entity';

@Entity('Cliente')
@Unique(['usuario'])
export class Cliente {
  @PrimaryGeneratedColumn()
  idCliente: number;

  @OneToOne(() => Usuario, (usuario) => usuario.cliente, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;

  @OneToMany(() => Calificacion, (calificacion) => calificacion.cliente)
  calificaciones: Calificacion[];
}
