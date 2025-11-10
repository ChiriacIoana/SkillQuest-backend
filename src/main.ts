import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initValidationPipe(app);
  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5500;

  await app.listen(port);
  console.log(`✅ Server running on http://localhost:${port}`);
}
bootstrap();

function initValidationPipe(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  );
}