import { Module } from '@nestjs/common';
import { OutingController } from './outing.controller';
import { OutingService } from './outing.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'OUTING_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'outing',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'outing-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [OutingController],
  providers: [OutingService],
})
export class OutingModule {}
