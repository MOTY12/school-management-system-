import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Prise API')
    .setDescription('This is Prise API Documentation.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    // swaggerOptions: {
    //   persistAuthorization: true,
    // },
    customSiteTitle: 'Prise API Docs',
  };
  SwaggerModule.setup('docs', app, document, customOptions);


  // Port
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  // Validation
  app.useGlobalPipes(new ValidationPipe({
    // whitelist: true,
    transform: true
  }));

  // Cors
  app.enableCors({
    origin: '*'
  });

  await app.listen(port || 3000);
}
bootstrap();
