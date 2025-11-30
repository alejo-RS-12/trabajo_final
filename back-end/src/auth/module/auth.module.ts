import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Usuario } from '../../usuario/entities/usuario.entity';
import { Rol } from '../../rol/entities/rol.entity';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Profesional } from '../../profesional/entities/profesional.entity';

import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../service/auth.service';
import { EmailService } from '../service/email.service';
import { JwtStrategy } from '../service/jwt.strategy';

@Module({
  imports: [
    ConfigModule,

    // 👇 AQUI INYECTAMOS TODAS LAS ENTIDADES QUE USA AuthService
    TypeOrmModule.forFeature([
      Usuario,
      Rol,
      Cliente,
      Profesional,
    ]),

    PassportModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    EmailService,
    JwtStrategy,
  ],

  exports: [AuthService],
})
export class AuthModule {}
