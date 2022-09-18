import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { OperatorModule } from './module/operator/operator.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  // Setup Operator Swagger
  const PhaseOneSwagger = new DocumentBuilder()
    .setTitle('Project API - Web App')
    .setDescription('API documentation for version 1 project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const PhaseOneDocument = SwaggerModule.createDocument(app, PhaseOneSwagger, {
    include: [OperatorModule],
  });

  SwaggerModule.setup('operator/docs/api', app, PhaseOneDocument);

  // Setup auto-validations
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3000);
}
bootstrap();
