// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import * as nodemailer from 'nodemailer';

// @Injectable()
// export class EmailService {
//   private transporter: nodemailer.Transporter;
//   private emailFrom: string;
//   private backendUrl: string;

//   constructor(private readonly config: ConfigService) {
//     try {
//     this.transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 465,
//       secure: true,

//       auth: {
//         user: this.config.get<string>('EMAIL_USER'),
//         pass: this.config.get<string>('EMAIL_PASS'),
//       },
//     });
//     } catch (error) {
//       console.error('Error creating email transporter:', error);
//     };

//     this.emailFrom = this.config.get<string>('EMAIL_FROM') || 'No-Reply <no-reply@example.com>';
//     this.backendUrl = this.config.get<string>('BACKEND_URL') || 'https://rop-ke9k.onrender.com';
//   }

//   /**
//    * 📩 Envío genérico de email
//    */
//   async sendMail(to: string, subject: string, html: string) {
//     return this.transporter.sendMail({
//       from: this.emailFrom,
//       to,
//       subject,
//       html,
//     });
//   }

//   async sendVerificationEmail(to: string, token: string, nombreUsuario: string, contrasena: string) {
//     const verifyLink = `${this.backendUrl}/auth/verify?token=${token}`;

//     const html = `
//     <div style="
//       font-family: Arial, sans-serif;
//       background: #f5f7fa;
//       padding: 30px;
//       color: #333;
//     ">
//       <div style="
//         max-width: 600px;
//         background: white;
//         margin: auto;
//         padding: 25px;
//         border-radius: 12px;
//         box-shadow: 0 4px 15px rgba(0,0,0,0.1);
//       ">
//         <h2 style="text-align:center; color:#4a90e2;">¡Bienvenido/a a <strong>Ropo</strong>! 🎉</h2>

//         <p style="font-size: 16px;">
//           Estamos muy contentos de tenerte con nosotros. Tu cuenta fue creada exitosamente.
//         </p>

//         <div style="
//           background: #f0f4ff;
//           padding: 15px;
//           border-left: 4px solid #4a90e2;
//           border-radius: 8px;
//           margin: 20px 0;
//         ">
//           <p style="margin:0; font-size: 15px;"><strong>🧑 Nombre de usuario:</strong> ${nombreUsuario}</p>
//           <p style="margin:0; font-size: 15px;"><strong>🔑 Contraseña:</strong> ${contrasena}</p>
//         </div>

//         <p style="font-size: 16px;">
//           Para activar tu cuenta, hacé clic en el siguiente botón:
//         </p>

//         <div style="text-align: center; margin-top: 25px;">
//           <a href="${verifyLink}"
//             style="
//               background: #4CAF50;
//               color: white;
//               padding: 12px 20px;
//               text-decoration: none;
//               font-size: 16px;
//               border-radius: 6px;
//               display: inline-block;
//             ">
//             ✔ Verificar mi cuenta
//           </a>
//         </div>

//         <p style="margin-top: 25px; font-size: 14px; color:#777;">
//           Si no creaste esta cuenta, simplemente ignorá este mensaje.
//         </p>

//         <p style="text-align:center; font-size: 12px; color:#aaa; margin-top: 40px;">
//           © ${new Date().getFullYear()} Ropo — Todos los derechos reservados.
//         </p>
//       </div>
//     </div>
//   `;

//     await this.sendMail(to, '¡Confirmá tu cuenta en Ropo!', html);
//   }



// }





// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { Resend } from 'resend';

// @Injectable()
// export class EmailService {
//   private resend: Resend;
//   private emailFrom: string;
//   private backendUrl: string;

//   constructor(private readonly config: ConfigService) {
//     this.resend = new Resend(this.config.get<string>('RESEND_API_KEY'));

//     this.emailFrom =
//       this.config.get<string>('EMAIL_FROM') ||
//       "Ropo <onboarding@resend.dev>";

//     this.backendUrl =
//       this.config.get<string>('BACKEND_URL') ||
//       'https://rop-ke9k.onrender.com';
//   }

//   /**
//    * 📩 Envío genérico de email usando Resend
//    */
//   async sendMail(to: string, subject: string, html: string) {
//     try {
//       const sent = await this.resend.emails.send({
//         from: this.emailFrom,
//         to,
//         subject,
//         html,
//       });

//       return sent;
//     } catch (error) {
//       console.error('Error enviando email:', error);
//       throw new Error('No se pudo enviar el email');
//     }
//   }

//   /**
//    * ✉ Enviar email de verificación
//    */
//   async sendVerificationEmail(
//     to: string,
//     token: string,
//     nombreUsuario: string,
//     contrasena: string,
//   ) {
//     const verifyLink = `${this.backendUrl}/auth/verify?token=${token}`;

//     const html = `
//       <div style="
//         font-family: Arial, sans-serif;
//         background: #f5f7fa;
//         padding: 30px;
//         color: #333;
//       ">
//         <div style="
//           max-width: 600px;
//           background: white;
//           margin: auto;
//           padding: 25px;
//           border-radius: 12px;
//           box-shadow: 0 4px 15px rgba(0,0,0,0.1);
//         ">
//           <h2 style="text-align:center; color:#4a90e2;">¡Bienvenido/a a <strong>Ropo</strong>! 🎉</h2>

//           <p style="font-size: 16px;">
//             Estamos muy contentos de tenerte con nosotros. Tu cuenta fue creada exitosamente.
//           </p>

//           <div style="
//             background: #f0f4ff;
//             padding: 15px;
//             border-left: 4px solid #4a90e2;
//             border-radius: 8px;
//             margin: 20px 0;
//           ">
//             <p style="margin:0; font-size: 15px;"><strong>🧑 Nombre de usuario:</strong> ${nombreUsuario}</p>
//             <p style="margin:0; font-size: 15px;"><strong>🔑 Contraseña:</strong> ${contrasena}</p>
//           </div>

//           <p style="font-size: 16px;">
//             Para activar tu cuenta, hacé clic en el siguiente botón:
//           </p>

//           <div style="text-align: center; margin-top: 25px;">
//             <a href="${verifyLink}"
//               style="
//                 background: #4CAF50;
//                 color: white;
//                 padding: 12px 20px;
//                 text-decoration: none;
//                 font-size: 16px;
//                 border-radius: 6px;
//                 display: inline-block;
//               ">
//               ✔ Verificar mi cuenta
//             </a>
//           </div>

//           <p style="margin-top: 25px; font-size: 14px; color:#777;">
//             Si no creaste esta cuenta, simplemente ignorá este mensaje.
//           </p>

//           <p style="text-align:center; font-size: 12px; color:#aaa; margin-top: 40px;">
//             © ${new Date().getFullYear()} Ropo — Todos los derechos reservados.
//           </p>
//         </div>
//       </div>
//     `;

//     await this.sendMail(to, '¡Confirmá tu cuenta en Ropo!', html);
//   }
// }


//   FUNCIONA PERO SOLO CON JOSECEREBRO


// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { Resend } from 'resend';

// @Injectable()
// export class EmailService {
//   private resend: Resend;
//   private backendUrl: string;

//   constructor(private readonly config: ConfigService) {
//     this.resend = new Resend(
//       this.config.get<string>('RESEND_API_KEY') ||
//       're_TAizyhn3_MfUiVcNoDMkc1ifHvxWQaDkN'
//     );

//     this.backendUrl =
//       this.config.get<string>('BACKEND_URL') ||
//       'https://rop-ke9k.onrender.com';
//   }

//   /**
//    * 📩 Envío simple de email con Resend (igual al ejemplo)
//    */
//   async sendMail(to: string, subject: string, html: string) {
//     try {
//       const sent = await this.resend.emails.send({
//         from: 'onboarding@resend.dev', // 🔥 Igual que el ejemplo probado
//         to,
//         subject,
//         html,
//       });

//       console.log('Email enviado:', sent);
//       return sent;
//     } catch (error) {
//       console.error('Error enviando email:', error);
//       throw new Error('No se pudo enviar el email');
//     }
//   }

//   /**
//    * ✉ Email de verificación
//    */
//   async sendVerificationEmail(
//     to: string,
//     token: string,
//     nombreUsuario: string,
//     contrasena: string,
//   ) {
//     const verifyLink = `${this.backendUrl}/auth/verify?token=${token}`;

//     const html = `
//       <p>Hola ${nombreUsuario},</p>
//       <p>Tu cuenta fue creada. Esta es tu contraseña: <strong>${contrasena}</strong></p>
//       <p>Para verificar tu cuenta hacé clic acá:</p>
//       <a href="${verifyLink}">Verificar cuenta</a>
//     `;

//     return this.sendMail(to, 'Confirmá tu cuenta', html);
//   }
// }

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Mailjet from 'node-mailjet';

@Injectable()
export class EmailService {
  private mailjet;
  private emailFrom: string;
  private backendUrl: string;

  constructor(private readonly config: ConfigService) {
    this.mailjet = Mailjet.apiConnect(
      this.config.get('MAILJET_API_KEY')!,
      this.config.get('MAILJET_API_SECRET')!,
    );

    this.emailFrom = this.config.get('EMAIL_FROM')!;
    this.backendUrl = this.config.get('BACKEND_URL')!;
  }

  async sendMail(to: string, subject: string, html: string) {
    try {
      const result = await this.mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: this.emailFrom.match(/<(.*)>/)?.[1] || this.emailFrom,
                Name: this.emailFrom.split('<')[0].trim(),
              },
              To: [
                {
                  Email: to,
                },
              ],
              Subject: subject,
              HTMLPart: html,
            },
          ],
        });

      return result.body;
    } catch (error) {
      console.error('❌ Error enviando email:', error);
      throw new Error('No se pudo enviar el email');
    }
  }

  async sendVerificationEmail(
    to: string,
    token: string,
    nombreUsuario: string,
    contrasena: string,
  ) {
    const verifyLink = `${this.backendUrl}/auth/verify?token=${token}`;

    const html = `
      <h2>Bienvenido/a a Ropo</h2>
      <p>Tu cuenta fue creada exitosamente.</p>

      <p><strong>Usuario:</strong> ${nombreUsuario}</p>
      <p><strong>Contraseña:</strong> ${contrasena}</p>

      <p>Verificá tu cuenta haciendo clic acá:</p>

      <a href="${verifyLink}">Verificar cuenta</a>
    `;

    return this.sendMail(to, 'Verificá tu cuenta en ROPO', html);
  }
}
