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

  // ✔ Rol opcional
  @ManyToOne(() => Rol, (rol) => rol.usuarios, { nullable: true })
  @JoinColumn({ name: 'idRol' })
  rol: Rol | null;

  // ✔ Relación opcional para cliente
  @OneToOne(() => Cliente, (cliente) => cliente.usuario, {
    nullable: true,
  })
  cliente: Cliente | null;

  // ✔ Relación opcional para profesional
  @OneToOne(() => Profesional, (profesional) => profesional.usuario, {
    nullable: true,
  })
  profesional: Profesional | null;

  @OneToMany(() => Mensaje, (mensaje) => mensaje.emisor)
  mensajesEnviados: Mensaje[];

  @OneToMany(() => Mensaje, (mensaje) => mensaje.receptor)
  mensajesRecibidos: Mensaje[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  tokenVerificacion: string | null;

  @Column({ default: false })
  verificado: boolean;
}
