
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Corujice Vendas API')
    .setDescription('Documentação da API separada por módulos (tags)')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    // Cada controller será agrupado por tag (nome do módulo/pasta)
    // O próprio NestJS já usa o @ApiTags nos controllers, mas se quiser customizar, pode usar aqui
  });
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
