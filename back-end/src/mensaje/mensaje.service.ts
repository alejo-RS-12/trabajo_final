import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensaje } from './entities/mensaje.entity';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { UpdateMensajeDto } from './dto/update-mensaje.dto';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class MensajeService {
  constructor(
    @InjectRepository(Mensaje)
    private readonly mensajeRepository: Repository<Mensaje>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createMensajeDto: CreateMensajeDto) {
    
    const { contenido, idEmisor, idReceptor } = createMensajeDto;
    const emisor = await this.usuarioRepository.findOneBy({ idUsuario: idEmisor });
    const receptor = await this.usuarioRepository.findOneBy({ idUsuario: idReceptor });

    if (!emisor || !receptor) {
      throw new Error("Emisor o receptor no encontrado");
    }

    const mensaje = this.mensajeRepository.create({
      contenido,
      emisor,
      receptor,
    });

    return this.mensajeRepository.save(mensaje);
  }
  
  async findConversacion(idEmisor: number, idReceptor: number) {
    return this.mensajeRepository.find({
      where: [
        { emisor: { idUsuario: idEmisor }, receptor: { idUsuario: idReceptor } },
        { emisor: { idUsuario: idReceptor }, receptor: { idUsuario: idEmisor } },
      ],
      relations: ['emisor', 'receptor'],
      order: { fecha: 'ASC' },
      });
    }
  
  findAll() {
    return this.mensajeRepository.find({ relations: ["emisor", "receptor"] });
  }

  findOne(id: number) {
    return this.mensajeRepository.findOne({ where: { idMensaje: id }, relations: ["emisor", "receptor"] });
  }

  async findConversaciones(idUsuario: number) {
  // Traemos todos los mensajes donde participó el usuario
  const mensajes = await this.mensajeRepository.find({
    where: [
      { emisor: { idUsuario } },
      { receptor: { idUsuario } },
    ],
    relations: ['emisor', 'receptor'],
    order: { fecha: 'DESC' }, // el más nuevo primero
  });

  // Mapa para guardar la última conversación con cada usuario
  const conversacionesMap = new Map<number, {
    idUsuario: number;
    nombreCompleto: string;
    ultimoMensaje: string;
    ultimaFecha: Date;
  }>();

  for (const msg of mensajes) {
    // Identificamos al "otro" usuario de la conversación
    const otroUsuario =
      msg.emisor.idUsuario === idUsuario ? msg.receptor : msg.emisor;

    // Si todavía no lo tenemos en el mapa, lo agregamos (solo el último mensaje)
    if (!conversacionesMap.has(otroUsuario.idUsuario)) {
      conversacionesMap.set(otroUsuario.idUsuario, {
        idUsuario: otroUsuario.idUsuario,
        nombreCompleto: otroUsuario.nombreCompleto,
        ultimoMensaje: msg.contenido,
        ultimaFecha: msg.fecha,
      });
    }
  }

  // Convertimos el mapa a un array ordenado por fecha descendente
  const conversaciones = Array.from(conversacionesMap.values()).sort(
    (a, b) => new Date(b.ultimaFecha).getTime() - new Date(a.ultimaFecha).getTime(),
  );

  return conversaciones;
}

  async update(id: number, updateMensajeDto: UpdateMensajeDto) {
    await this.mensajeRepository.update(id, updateMensajeDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.mensajeRepository.delete(id);
  }
}
