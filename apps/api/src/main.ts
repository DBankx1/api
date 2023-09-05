import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomRpcExceptionFilter } from '@outler/common/exceptions/app-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CustomRpcExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      enableDebugMessages: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableShutdownHooks();
  await app.listen(3000);
}
bootstrap();
