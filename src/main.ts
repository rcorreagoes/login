import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {cors: true });

    const options = new DocumentBuilder()
    .setTitle('Login')
    .setDescription('Documentação da API')
    .setVersion('0.0.1')
    .addBearerAuth({type: 'http', scheme: 'bearer', bearerFormat: 'Bearer'}, 'access-token')
    .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(3000);
}
bootstrap();
