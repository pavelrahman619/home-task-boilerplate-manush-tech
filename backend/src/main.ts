import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') || 5000;

  app.useGlobalPipes(
    new ValidationPipe({
      // adds validation to all routes
      whitelist: true, // strips away any properties that are not present in the DTO
    }),
  );
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  await app.listen(PORT).then(() => {
    console.log(`
          ####################################
          🔥  Server listening on port: ${PORT} 🔥
          ####################################
    `);
  });
}
bootstrap();
