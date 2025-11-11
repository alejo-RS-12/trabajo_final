import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // Envío genérico
  async sendMail(to: string, subject: string, html: string) {
    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
  }

  // Envío de verificación de cuenta
  async sendVerificationEmail(to: string, token: string) {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';

    const verifyLink = `${backendUrl}/auth/verify?token=${token}`;

    const html = `
    <h2>¡Bienvenido/a a Ropo!</h2>
    <p>Para activar tu cuenta, hacé clic en el siguiente enlace:</p>
    <a href="${verifyLink}" 
       style="display:inline-block;padding:10px 20px;
       background-color:#4CAF50;color:white;text-decoration:none;
       border-radius:5px;">Verificar cuenta</a>
    <p>Si no creaste esta cuenta, podés ignorar este correo.</p>
  `;

    await this.sendMail(to, 'Verificá tu cuenta', html);
  }
}
