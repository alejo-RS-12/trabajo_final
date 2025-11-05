import {
  NotFoundException,
  BadRequestException,
  Injectable, UnauthorizedException
} from '@nestjs/common';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Profesional } from 'src/profesional/entities/profesional.entity';
import { ProfesionalProfesion } from 'src/profesional/entities/profesionalprofesion.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,

    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,

    @InjectRepository(Profesional)
    private profesionalRepository: Repository<Profesional>,
  ) {}
 // 📌 Registro
  async register(data: Partial<Usuario>) {
    // Validar email único
    const existeEmail = await this.usuarioRepository.findOne({ where: { email: data.email } });
    if (existeEmail) throw new BadRequestException('El email ya está registrado');

    // Validar nombre de usuario único
    const existeUser = await this.usuarioRepository.findOne({ where: { nombreDeUsuario: data.nombreDeUsuario } });
    if (existeUser) throw new BadRequestException('El nombre de usuario ya está en uso');

    // Buscar rol por defecto (Usuario común → idRol = 1)
    const rolDefault = await this.rolRepository.findOne({ where: { idRol: 1 } });
    if (!rolDefault) {
      throw new BadRequestException('El rol por defecto no existe en la base de datos');
    }

    // Hashear contraseña
    if (!data.contrasena) {
      throw new BadRequestException('La contraseña es obligatoria');
    }
    const hashedPass = await bcrypt.hash(data.contrasena, 10);

    // Crear usuario
    const nuevoUsuario = this.usuarioRepository.create({
      ...data,
      contrasena: hashedPass,
      rol: rolDefault, // ⚡ ya validado, nunca null
    });

    const usuarioGuardado = await this.usuarioRepository.save(nuevoUsuario);

    // No devolver la contraseña
    const { contrasena, ...resto } = usuarioGuardado;

    return { message: 'Usuario registrado correctamente', usuario: resto };
  }


  // 📌 Login
  async login(email: string, contrasena: string) {
    const usuario = await this.usuarioRepository.findOne({ where: { email }, relations: ['rol'] });
    if (!usuario) throw new UnauthorizedException('Credenciales inválidas');

    const match = await bcrypt.compare(contrasena, contrasena);
    if (!match) throw new UnauthorizedException('Credenciales inválidas');

    const { contrasena: _, ...resto } = usuario;
    return { message: 'Login exitoso', usuario: resto };
  }

  // 📌 Login con Google

  async googleLogin(googleUser: { email: string; nombre: string }) {
    let usuario = await this.usuarioRepository.findOne({
      where: { email: googleUser.email },
      relations: ['rol'],
    });

    if (!usuario) {
      // 👉 Buscar rol por defecto y validar que exista
      const rolDefault = await this.rolRepository.findOne({ where: { idRol: 1 } });
      if (!rolDefault) {
        throw new BadRequestException('El rol por defecto no existe en la base de datos');
      }

      // 👉 Crear nuevo usuario con rol válido
      usuario = this.usuarioRepository.create({
        email: googleUser.email,
        nombreCompleto: googleUser.nombre,
        //contrasena: null,   // permitido porque en la entidad es nullable
        //esGoogle: true,
        rol: rolDefault,    // ahora siempre es un Rol, nunca null
      });

      await this.usuarioRepository.save(usuario);
    }

    const { contrasena, ...resto } = usuario;
    return { message: 'Login con Google exitoso', usuario: resto };
  }

  async crearUsuarioConRol(data: CreateUsuarioDto): Promise<Usuario> {
    // 1. Buscar rol
    let rol = await this.rolRepository.findOneBy({ idRol: data.idRol });
    if (!rol)
      throw new BadRequestException(`Rol con id ${data.idRol} no existe`);

    // 2. Crear usuario
    const usuario = this.usuarioRepository.create({
      nombreCompleto: data.nombreCompleto,
      nombreDeUsuario: data.nombreDeUsuario,
      email: data.email,
      contrasena: data.contrasena,
      rol,
    });
    await this.usuarioRepository.save(usuario);

    // 3. Crear Cliente o Profesional según rol
    if (data.idRol === 2) {
      let cliente = this.clienteRepository.create({ usuario });
      await this.clienteRepository.save(cliente);
    }

    if (data.idRol === 3) {
      // data.idProfesion puede ser un número o un array de ids
      let ids: number[] =
        data.idProfesion != null
          ? Array.isArray(data.idProfesion)
            ? data.idProfesion
            : [data.idProfesion]
          : [];

      const profesionesIntermedias = ids.map((id) =>
        this.profesionalRepository.manager.create(ProfesionalProfesion, {
          profesion: { idProfesion: id },
          profesional,
        }),
      );

      let profesional = this.profesionalRepository.create({
        usuario,
        profesiones: profesionesIntermedias,
      });
      await this.profesionalRepository.save(profesional);
    }

    return usuario;
  }

  findAll() {
    return this.usuarioRepository.find({ relations: ['rol'] });
  }

  findOne(id: number) {
    return this.usuarioRepository.findOne({
      where: { idUsuario: id },
      relations: ['rol'],
    });
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    // Buscar el usuario
    let usuario = await this.usuarioRepository.findOne({
      where: { idUsuario: id },
      relations: ['rol'],
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no existe`);
    }

    // Validar que exista el rol del body
    if (updateUsuarioDto.idRol) {
      let rol = await this.rolRepository.findOneBy({
        idRol: updateUsuarioDto.idRol,
      });
      if (!rol) {
        throw new BadRequestException(
          `El rol con id ${updateUsuarioDto.idRol} no existe en la base de datos`,
        );
      }
      usuario.rol = rol;
    }

    // Actualizar el resto de los campos
    let { idRol, ...resto } = updateUsuarioDto;
    Object.assign(usuario, resto);
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number) {
    let usuario = await this.findOne(id);
    if (!usuario) {
      return null;
    }
    await this.usuarioRepository.remove(usuario);
    return usuario;
  }

    async agregarFavorito(idUsuario: number, idPublicacion: number) {
    const usuario = await this.usuarioRepository.findOneBy({ idUsuario });
    if (!usuario) throw new Error('Usuario no encontrado');

    if (!usuario) {
    throw new NotFoundException("Usuario no encontrado");
  }

    if (!usuario.favoritos) {
    usuario.favoritos = [];
  }

    // Evitar duplicados
    if (!usuario.favoritos.includes(idPublicacion)) {
      usuario.favoritos.push(idPublicacion);
    }

    return this.usuarioRepository.save(usuario);
  }

  async quitarFavorito(idUsuario: number, idPublicacion: number) {
    const usuario = await this.usuarioRepository.findOneBy({ idUsuario });
    if (!usuario) throw new Error('Usuario no encontrado');

    usuario.favoritos = usuario.favoritos.filter(id => id !== idPublicacion);

    return this.usuarioRepository.save(usuario);
  }

  async obtenerFavoritos(idUsuario: number) {
    const usuario = await this.usuarioRepository.findOneBy({ idUsuario });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    if (!usuario.favoritos) {
      usuario.favoritos = [];
    }
    return usuario.favoritos;
  }
}



