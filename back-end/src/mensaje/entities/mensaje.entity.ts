import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('mensaje')
export class Mensaje {
  @PrimaryGeneratedColumn()
  idMensaje: number;

  @Column({ type: 'text' })
  contenido: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  // Relación con Emisor (Usuario)
  @ManyToOne(() => Usuario, (usuario) => usuario.mensajesEnviados, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idEmisor' })
  emisor: Usuario;

  // Relación con Receptor (Usuario)
  @ManyToOne(() => Usuario, (usuario) => usuario.mensajesRecibidos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idReceptor' })
  receptor: Usuario;
}
