import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Online Jewelry API')
    .setDescription(
      'The Online Jewelry API for serving multiple endpoints like creating, fetching and updating products, users, etc.',
    )
    .setVersion('1.0')
    .addTag('online-jewelry')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Online Jewelry API Docs',
  };
  SwaggerModule.setup('api', app, document, customOptions);

  await app.listen(4000);
}
bootstrap();
