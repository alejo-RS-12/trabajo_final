import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../service/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])], 
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}