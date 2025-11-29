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
import * as nodemailer from 'nodemailer'; // 👈 Importación corregida

@Injectable()
export class EmailService {
  private transporter;

  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get<string>('EMAIL_HOST'), // Úsalo desde env
      port: 465,
      secure: true,
      auth: {
        user: this.config.get<string>('EMAIL_USER'),
        pass: this.config.get<string>('EMAIL_PASS'),
      },
    });
  }

  async sendMail(to: string, subject: string, html: string) {
    try {
      // Limpiamos el remitente para evitar errores de formato
      const fromUser = this.config.get<string>('EMAIL_USER');
      const fromEnv = this.config.get<string>('EMAIL_FROM');
      
      const sendInfo = await this.transporter.sendMail({
        from: fromEnv || fromUser, // Prioriza la variable configurada
        to,
        subject,
        html,
      });

      console.log('📨 Email enviado ID:', sendInfo.messageId);
      return sendInfo;
    } catch (error) {
      // Este log es vital para saber POR QUÉ falla
      console.error('❌ Error detallado:', error); 
      throw new Error('Error al enviar el correo');
    }
  }

  async sendVerificationEmail(to: string, token: string, nombre: string, pass: string) {
    // Asegúrate de que backendUrl no tenga slash al final si lo agregas manualmente
    const baseUrl = this.config.get<string>('BACKEND_URL'); 
    const verifyLink = `${baseUrl}/auth/verify?token=${token}`;

    const html = `
      <h1>Bienvenido a ROPO</h1>
      <p>Hola ${nombre},</p>
      <p>Tu contraseña temporal es: <b>${pass}</b></p>
      <a href="${verifyLink}" style="padding: 10px 20px; background: blue; color: white; text-decoration: none;">Verificar Cuenta</a>
    `;

    return this.sendMail(to, 'Bienvenido a ROPO - Verifica tu cuenta', html);
  }
}