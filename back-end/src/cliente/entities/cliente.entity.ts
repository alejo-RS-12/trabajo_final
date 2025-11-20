import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('Cliente')
@Unique(['usuario'])
export class Cliente {
  @PrimaryGeneratedColumn()
  idCliente: number;

  @OneToOne(() => Usuario, (usuario) => usuario.cliente, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;
}
