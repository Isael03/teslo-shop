import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      /*transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },*/
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Teslo RestFul API')
    .setDescription('Teslo shop enpoints')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  console.log('Server is running on port', process.env.PORT);
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Server running on port: ${process.env.PORT}`);
}
bootstrap();
