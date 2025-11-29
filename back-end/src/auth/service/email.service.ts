import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private emailFrom: string;
  private backendUrl: string;

  constructor(private readonly config: ConfigService) {
    try {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.config.get<string>('EMAIL_USER'),
        pass: this.config.get<string>('EMAIL_PASS'),
      },
    });
    } catch (error) {
      console.error('Error creating email transporter:', error);
    };

    this.emailFrom = this.config.get<string>('EMAIL_FROM') || 'No-Reply <no-reply@example.com>';
    this.backendUrl = this.config.get<string>('BACKEND_URL') || 'https://rop-ke9k.onrender.com';
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

  async sendVerificationEmail(to: string, token: string, nombreUsuario: string, contrasena: string) {
    const verifyLink = `${this.backendUrl}/auth/verify?token=${token}`;

    const html = `
    <div style="
      font-family: Arial, sans-serif;
      background: #f5f7fa;
      padding: 30px;
      color: #333;
    ">
      <div style="
        max-width: 600px;
        background: white;
        margin: auto;
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      ">
        <h2 style="text-align:center; color:#4a90e2;">¡Bienvenido/a a <strong>Ropo</strong>! 🎉</h2>

        <p style="font-size: 16px;">
          Estamos muy contentos de tenerte con nosotros. Tu cuenta fue creada exitosamente.
        </p>

        <div style="
          background: #f0f4ff;
          padding: 15px;
          border-left: 4px solid #4a90e2;
          border-radius: 8px;
          margin: 20px 0;
        ">
          <p style="margin:0; font-size: 15px;"><strong>🧑 Nombre de usuario:</strong> ${nombreUsuario}</p>
          <p style="margin:0; font-size: 15px;"><strong>🔑 Contraseña:</strong> ${contrasena}</p>
        </div>

        <p style="font-size: 16px;">
          Para activar tu cuenta, hacé clic en el siguiente botón:
        </p>

        <div style="text-align: center; margin-top: 25px;">
          <a href="${verifyLink}"
            style="
              background: #4CAF50;
              color: white;
              padding: 12px 20px;
              text-decoration: none;
              font-size: 16px;
              border-radius: 6px;
              display: inline-block;
            ">
            ✔ Verificar mi cuenta
          </a>
        </div>

        <p style="margin-top: 25px; font-size: 14px; color:#777;">
          Si no creaste esta cuenta, simplemente ignorá este mensaje.
        </p>

        <p style="text-align:center; font-size: 12px; color:#aaa; margin-top: 40px;">
          © ${new Date().getFullYear()} Ropo — Todos los derechos reservados.
        </p>
      </div>
    </div>
  `;

    await this.sendMail(to, '¡Confirmá tu cuenta en Ropo!', html);
  }



}
