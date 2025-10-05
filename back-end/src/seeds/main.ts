import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  // Creamos solo un contexto de aplicación Nest para el seed
  const appContext = await NestFactory.createApplicationContext(SeedModule);

  const seedService = appContext.get(SeedService);

  await seedService.runSeed();

  await appContext.close(); // cerramos la app después de correr el seed
  console.log('✅ Seed finalizado');
}

bootstrap();