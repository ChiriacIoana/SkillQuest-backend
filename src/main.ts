import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import envConfig from 'env.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	initValidationPipe(app);
	app.enableCors({
		origin: [
			'skill-quest-omega.vercel.app',
			'http://localhost:3000',
		],
		
		credentials: true,
		methods:['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
		allowedHeaders:['Content-Type','Authorization']
	});

  const port = envConfig.PORT;
  await app.listen(port);
  //onsole.log('DATABASE_URL:', envConfig.DATABASE_URL);


  console.log(`Server running on port ${port}`);
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
