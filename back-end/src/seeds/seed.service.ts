import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../rol/entities/rol.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Profesion } from '../profesion/entities/profesion.entity';
import { Profesional } from '../profesional/entities/profesional.entity'
import { Publicacion } from '../publicacion/entities/publicacion.entity';
import * as fs from 'fs';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Rol)
    private rolRepo: Repository<Rol>,
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
    @InjectRepository(Profesion)
    private profesionRepo: Repository<Profesion>,
    @InjectRepository(Profesional)
    private profesionalRepo: Repository<Profesional>,
    @InjectRepository(Publicacion)
    private publicacionRepo: Repository<Publicacion>,
  ) {}

  async runSeed() {
    const roles = JSON.parse(fs.readFileSync('src/seeds/roles.json', 'utf8'));
    await this.rolRepo.save(roles);

    const usuariosJson = JSON.parse(fs.readFileSync('src/seeds/usuarios.json', 'utf8'));
    
    for (const u of usuariosJson) {
      const rol = roles.find(r => r.idRol === u.idRol);
      if (!rol) throw new Error(`Rol con id ${u.idRol} no existe`);
      
      await this.usuarioRepo.save({
        nombreCompleto: u.nombreCompleto,
        nombreDeUsuario: u.nombreDeUsuario,
        email: u.email,
        contrasena: u.contrasena,
        rol, 
      });
    }

    const profesiones = JSON.parse(fs.readFileSync('src/seeds/profesiones.json', 'utf8'));
    await this.profesionRepo.save(profesiones);

    const profesionalesJson = JSON.parse(fs.readFileSync('src/seeds/profesionales.json', 'utf8'));
    await this.profesionalRepo.save(profesionalesJson);


    const publicaciones = JSON.parse(fs.readFileSync('src/seeds/publicaciones.json', 'utf8'));
    await this.publicacionRepo.save(publicaciones);

    console.log('✅ Seed completo');
  }
}