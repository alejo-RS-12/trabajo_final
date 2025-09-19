import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🌐 Habilitar CORS (permite que el frontend consuma el backend)
  app.enableCors({
    origin: 'http://localhost:4200', // ⚡️ cámbialo según dónde sirvas tu frontend
    credentials: true,
  });

  // ✅ Pipes globales para validaciones DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina campos no esperados en DTO
      forbidNonWhitelisted: true, // lanza error si mandan campos extra
      transform: true, // convierte automáticamente tipos (string->number, etc.)
    }),
  );

  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT);
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
}
bootstrap();
