import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const listenPort = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`listen it http://localhost:3000`)

  const config = new DocumentBuilder()
  .setTitle('图书管理平台')
  .setDescription('软件开发与重构作业')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);


  await app.listen(3000);
}
bootstrap();
