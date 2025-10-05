import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('rol')
export class Rol {
  @PrimaryGeneratedColumn()
  idRol: number;

  @Column({ length: 50, unique: true })
  nombreRol: string;

  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  usuarios: Usuario[];
}
