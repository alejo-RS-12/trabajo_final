import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { METHODS } from 'http';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({origin: ["https://ropo-7e929.web.app",
      "https://ropo-7e929.firebaseapp.com", "http://localhost:5173"], 
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    credentials: true,});
  // Carpeta uploads accesible públicamente
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
