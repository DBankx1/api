import { NestFactory } from '@nestjs/core';
import { OutingModule } from './outing.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CustomRpcExceptionFilter } from '@outler/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OutingModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'outing-consumer',
        },
      },
    },
  );

  app.useGlobalFilters(new CustomRpcExceptionFilter());

  app.listen();
}
bootstrap();
