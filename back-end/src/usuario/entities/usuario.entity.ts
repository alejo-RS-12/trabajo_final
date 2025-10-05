import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Rol } from '../../rol/entities/rol.entity';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Profesional } from '../../profesional/entities/profesional.entity';
import { Mensaje } from '../../mensaje/entities/mensaje.entity';

@Entity('Usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column({ length: 100 })
  nombreCompleto: string;

  @Column({ length: 100 })
  nombreDeUsuario: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ length: 255 })
  contrasena: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fechaRegistro: Date;

  @Column({ type: 'json', nullable: true })
  favoritos: number[];
  
  @ManyToOne(() => Rol, (rol) => rol.usuarios, { nullable: false })
  @JoinColumn({ name: 'idRol' })
  rol: Rol;

  @OneToOne(() => Cliente, (cliente) => cliente.usuario)
  cliente: Cliente;

  @OneToOne(() => Profesional, (profesional) => profesional.usuario)
  profesional: Profesional;

  @OneToMany(() => Mensaje, (mensaje) => mensaje.emisor)
  mensajesEnviados: Mensaje[];

  @OneToMany(() => Mensaje, (mensaje) => mensaje.receptor)
  mensajesRecibidos: Mensaje[];
}
