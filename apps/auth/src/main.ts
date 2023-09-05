import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CustomRpcExceptionFilter } from '@outler/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'auth-consumer',
        },
      },
    },
  );

  app.useGlobalFilters(new CustomRpcExceptionFilter());

  app.listen();
}
bootstrap();
