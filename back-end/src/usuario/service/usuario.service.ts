import {
  NotFoundException,
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from '../entities/usuario.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Profesional } from 'src/profesional/entities/profesional.entity';
import { ProfesionalProfesion } from 'src/profesional/entities/profesionalprofesion.entity';


import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';



import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,

    @InjectRepository(Profesional)
    private readonly profesionalRepository: Repository<Profesional>,
  ) { }

  // ======================================================
  // 1) REGISTRO
  // ======================================================
  async register(data: Partial<Usuario>) {
    // Email único
    const existeEmail = await this.usuarioRepository.findOne({
      where: { email: data.email },
    });
    if (existeEmail)
      throw new BadRequestException('El email ya está registrado');

    // Usuario único
    const existeUser = await this.usuarioRepository.findOne({
      where: { nombreDeUsuario: data.nombreDeUsuario },
    });
    if (existeUser)
      throw new BadRequestException('El nombre de usuario ya está en uso');

    // Rol por defecto (idRol = 1)
    const rolDefault = await this.rolRepository.findOne({
      where: { idRol: 1 },
    });
    if (!rolDefault)
      throw new BadRequestException('El rol por defecto no existe');

    if (!data.contrasena)
      throw new BadRequestException('La contraseña es obligatoria');

    const hashedPass = await bcrypt.hash(data.contrasena, 10);

    // Crear usuario
    const nuevoUsuario = this.usuarioRepository.create({
      ...data,
      contrasena: hashedPass,
      rol: rolDefault,
    });

    const usuarioGuardado = await this.usuarioRepository.save(nuevoUsuario);
    const { contrasena, ...resto } = usuarioGuardado;

    return { message: 'Usuario registrado correctamente', usuario: resto };
  }

  // ======================================================
  // 2) LOGIN
  // ======================================================
  async login(email: string, password: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { email },
      relations: ['rol'],
    });

    if (!usuario) throw new UnauthorizedException('Credenciales inválidas');

    const match = await bcrypt.compare(password, usuario.contrasena);
    if (!match) throw new UnauthorizedException('Credenciales inválidas');

    const { contrasena: _, ...resto } = usuario;
    return { message: 'Login exitoso', usuario: resto };
  }

  // ======================================================
  // 3) CREAR USUARIO DIRECTO CON ROL (ADMIN)
  // ======================================================
  async crearUsuarioConRol(data: CreateUsuarioDto): Promise<Usuario> {
    const rol = await this.rolRepository.findOneBy({ idRol: data.idRol });
    if (!rol) throw new BadRequestException(`Rol ${data.idRol} no existe`);

    const hashedPass = await bcrypt.hash(data.contrasena, 10);

    const usuario = this.usuarioRepository.create({
      ...data,
      contrasena: hashedPass,
      rol,
    });

    await this.usuarioRepository.save(usuario);

    // Crear tabla cliente o profesional
    if (data.idRol === 2) {
      await this.clienteRepository.save(
        this.clienteRepository.create({ usuario }),
      );
    }

    if (data.idRol === 3) {
      // 1️⃣ Crear primero el profesional vacío asociado al usuario
      let profesional = this.profesionalRepository.create({
        usuario,
      });

      // Guardar para generar idProfesional
      profesional = await this.profesionalRepository.save(profesional);

      // 2️⃣ Normalizar profesiones
      let ids: number[] = [];

      if (data.idProfesion != null) {
        ids = Array.isArray(data.idProfesion)
          ? data.idProfesion
          : [data.idProfesion];
      }

      // 3️⃣ Crear relaciones profesional-profesion
      const profesionesIntermedias = ids.map((id) =>
        this.profesionalRepository.manager.create(ProfesionalProfesion, {
          profesion: { idProfesion: id },
          profesional: { idProfesional: profesional.idProfesional },
        }),
      );

      // 4️⃣ Asignarlas al profesional
      profesional.profesiones = profesionesIntermedias;

      // 5️⃣ Guardar todo
      await this.profesionalRepository.save(profesional);
    }
    return usuario;
  }

  // ======================================================
  // 4) FIND ALL
  // ======================================================
  findAll() {
    return this.usuarioRepository.find({ relations: ['rol'] });
  }

  // ======================================================
  // 5) FIND ONE
  // ======================================================
  findOne(id: number) {
    return this.usuarioRepository.findOne({
      where: { idUsuario: id },
      relations: ['rol'],
    });
  }

  // ======================================================
  // 6) UPDATE USUARIO
  // ======================================================
  async update(id: number, updateDto: UpdateUsuarioDto): Promise<Usuario> {
  let usuario = await this.usuarioRepository.findOne({
    where: { idUsuario: id },
    relations: ['rol'],
  });

  if (!usuario)
    throw new NotFoundException(`Usuario ${id} no existe`);

  // ================================
  // CAMBIO DE ROL
  // ================================
  if (updateDto.idRol) {
    const rol = await this.rolRepository.findOneBy({
      idRol: updateDto.idRol,
    });

    if (!rol)
      throw new BadRequestException(
        `El rol ${updateDto.idRol} no existe`,
      );

    usuario.rol = rol;

    // -----------------------------------
    // SI AHORA ES CLIENTE → CREAR CLIENTE
    // -----------------------------------
    if (rol.idRol === 2) {
      const existeCliente = await this.clienteRepository.findOne({
        where: { usuario: { idUsuario: usuario.idUsuario } },
      });

      if (!existeCliente) {
        await this.clienteRepository.save(
          this.clienteRepository.create({ usuario }),
        );
      }
    }

    // -------------------------------------------
    // SI AHORA ES PROFESIONAL → CREAR PROFESIONAL
    // -------------------------------------------
    if (rol.idRol === 3) {
      const existeProfesional = await this.profesionalRepository.findOne({
        where: { usuario: { idUsuario: usuario.idUsuario } },
      });

      if (!existeProfesional) {
        await this.profesionalRepository.save(
          this.profesionalRepository.create({
            usuario,
            matricula: null,
            descripcion: null,
          }),
        );
      }
    }
  }

  // =====================================
  // ACTUALIZAR CAMPOS QUE NO SON idRol
  // =====================================
  const { idRol, ...resto } = updateDto;
  Object.assign(usuario, resto);

  return this.usuarioRepository.save(usuario);
}

  // ======================================================
  // 7) DELETE USUARIO
  // ======================================================
  async remove(id: number) {
    const usuario = await this.findOne(id);
    if (!usuario) return null;

    await this.usuarioRepository.remove(usuario);
    return usuario;
  }

  // ======================================================
  // 8) FAVORITOS
  // ======================================================
  async agregarFavorito(idUsuario: number, idPublicacion: number) {
    const usuario = await this.usuarioRepository.findOneBy({ idUsuario });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    usuario.favoritos ??= [];

    if (!usuario.favoritos.includes(idPublicacion)) {
      usuario.favoritos.push(idPublicacion);
    }

    return this.usuarioRepository.save(usuario);
  }

  async quitarFavorito(idUsuario: number, idPublicacion: number) {
    const usuario = await this.usuarioRepository.findOneBy({ idUsuario });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    usuario.favoritos = usuario.favoritos.filter(
      (id) => id !== idPublicacion,
    );

    return this.usuarioRepository.save(usuario);
  }

  async obtenerFavoritos(idUsuario: number) {
    const usuario = await this.usuarioRepository.findOneBy({ idUsuario });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    return usuario.favoritos ?? [];
  }
}
