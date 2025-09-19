import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn
} from 'typeorm';
import { Rol } from '../../rol/rol.entity';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'idUsuario' })
  idUsuario: number;

  @Column({ length: 100 })
  nombreCompleto: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, length: 50 })
  nombreDeUsuario: string;

  @Column({ length: 255, nullable: true, select: false })
  contrasena: string | null;

  @Column({ default: false })
  esGoogle: boolean;

  @ManyToOne(() => Rol, { eager: true })
  @JoinColumn({ name: 'idRol' })
  rol: Rol;

  @CreateDateColumn({ name: 'fechaRegistro' })
  fechaRegistro: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;
}
