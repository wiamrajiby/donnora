import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'https://donnora.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  await app.listen(3001);
  console.log('✅ API Donnora active sur http://localhost:3001/api');
}
bootstrap();
