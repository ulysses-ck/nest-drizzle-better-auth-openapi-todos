import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bodyParser: false,
	});

	const config = new DocumentBuilder()
		.setTitle('Todos App')
		.setDescription('The Todos API description')
		.setVersion('1.0')
		.addTag('todos')
		.addCookieAuth('better-auth.session-token')
		.build();

	const documentFactory = () => SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('api', app, documentFactory);

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
