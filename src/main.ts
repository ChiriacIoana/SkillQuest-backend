import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import envConfig from 'env.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

	initValidationPipe(app);
	app.enableCors();

  const port = envConfig.PORT;
  await app.listen(port);

  console.log(`✅ Server running on port ${port}`);
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
