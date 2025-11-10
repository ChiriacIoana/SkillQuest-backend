import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import envConfig from 'env.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	initValidationPipe(app);
	app.enableCors();

	await app.listen(envConfig.PORT);
	console.log(`✅ Server running on http://localhost:${envConfig.PORT}`);
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
