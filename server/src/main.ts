import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // CORS configuration
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
  });

  await app.listen(process.env.PORT || 5000);
}

bootstrap();
