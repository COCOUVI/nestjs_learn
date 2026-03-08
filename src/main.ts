import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Validation globale des DTO
  app.useGlobalPipes(new ValidationPipe());

  // Sécurité CORS pour front séparé
  app.enableCors({
    origin: ['*'], // tu peux mettre ton front ici
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    credentials: true,
  });

  // Helmet pour la sécurité des headers HTTP
  app.use(helmet());

  // Récupération IP si derrière un proxy
  app.set('trust proxy', 'loopback');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();