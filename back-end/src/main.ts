import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS correcto para Firebase Hosting
  app.enableCors({
    origin: [
      "https://ropo-7e929.web.app",
      "https://ropo-7e929.firebaseapp.com",
      "http://localhost:5173"
    ],
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  });

  // Carpeta /uploads pública
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
    setHeaders: (res, path) => {
      res.setHeader('Access-Control-Allow-Origin', '*');          
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      res.setHeader('Cross-Origin-Opener-Policy', 'same-origin'); 
      res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    }
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
