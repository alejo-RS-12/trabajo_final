import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { emails, displayName } = profile;

    // Buscar si el usuario ya existe
    let usuario = await this.usuarioRepo.findOne({
      where: { email: emails[0].value },
    });

    if (!usuario) {
        usuario = this.usuarioRepo.create({
        nombreCompleto: displayName,  //aca cambie nombre por nombreCompleto
        email: emails[0].value,
        //esGoogle: true,  // no existe en usuario entity
      });
      await this.usuarioRepo.save(usuario);
    }

    // Passport pone esto en req.user
    done(null, usuario);
  }
}
