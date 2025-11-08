import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for your React frontend
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // Get the port from environment variables (or default to 5500)
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5500;

  await app.listen(port);
  console.log(`✅ Server running on http://localhost:${port}`);
}
bootstrap();
