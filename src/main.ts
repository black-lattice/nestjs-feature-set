import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public', {
    prefix: '/qrcode-login',
  });
  app.useStaticAssets('public/question_bank', {
    prefix: '/question',
  });
  app.useStaticAssets('public', {
    prefix: '/question',
  });

  // swagger API文档
  const options = new DocumentBuilder()
    .setTitle('JWT登陆测试')
    .setDescription('接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger-doc', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
