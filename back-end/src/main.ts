import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { METHODS } from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: ["https://ropo-7e929.web.app",
      "https://ropo-7e929.firebaseapp.com", "http://localhost:5173"], 
    METHODS: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    credentials: true,});
  // Carpeta uploads accesible públicamente
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
