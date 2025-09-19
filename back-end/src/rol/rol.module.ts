import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rol])],
  providers: [RolService],
  controllers: [RolController],
  exports: [RolService], // 👈 si otros módulos necesitan los roles
})
export class RolModule {}
