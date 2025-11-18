import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private emailFrom: string;
  private backendUrl: string;

  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.config.get<string>('EMAIL_USER'),
        pass: this.config.get<string>('EMAIL_PASS'),
      },
    });

    this.emailFrom = this.config.get<string>('EMAIL_FROM') || 'No-Reply <no-reply@example.com>';
    this.backendUrl = this.config.get<string>('BACKEND_URL') || 'http://localhost:3000';
  }

  /**
   * 📩 Envío genérico de email
   */
  async sendMail(to: string, subject: string, html: string) {
    return this.transporter.sendMail({
      from: this.emailFrom,
      to,
      subject,
      html,
    });
  }

  /**
   * ✔ Envío de email de verificación de cuenta
   */
  async sendVerificationEmail(to: string, token: string) {
    const verifyLink = `${this.backendUrl}/auth/verify?token=${token}`;

    const html = `
      <h2>¡Bienvenido/a a Ropo!</h2>
      <p>Para activar tu cuenta, hacé clic en el siguiente enlace:</p>
      <a href="${verifyLink}"
         style="display:inline-block;padding:10px 20px;background-color:#4CAF50;
         color:white;text-decoration:none;border-radius:5px;">
         Verificar cuenta
      </a>
      <br/>
      <p>Si no creaste esta cuenta, podés ignorar este correo.</p>
    `;

    await this.sendMail(to, 'Verificá tu cuenta', html);
  }
}
