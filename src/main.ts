import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ClientModule } from './module/client/client.module';
import { OperatorModule } from './module/operator/operator.module';
import { ENV_CONFIG } from './shared/constants/env.constant';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  // Setup Operator Swagger
  const ClientSwagger = new DocumentBuilder()
    .setTitle('Project API - Web App')
    .setDescription('API documentation for version 1 project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const ClientDocument = SwaggerModule.createDocument(app, ClientSwagger, {
    include: [ClientModule],
  });

  SwaggerModule.setup('client/docs/api', app, ClientDocument);

  // Setup Operator Swagger
  const OperatorSwagger = new DocumentBuilder()
    .setTitle('Project API - Web App')
    .setDescription('API documentation for version 1 project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const OperatorDocument = SwaggerModule.createDocument(app, OperatorSwagger, {
    include: [OperatorModule],
  });

  SwaggerModule.setup('operator/docs/api', app, OperatorDocument);

  // Setup auto-validations
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(ENV_CONFIG.system.port);
  Logger.log(`Server listening on http://localhost:${ENV_CONFIG.system.port}/`);
}
bootstrap();
