import { Module } from '@nestjs/common';
import { OutingController } from './outing.controller';
import { OutingService } from './outing.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Outing, OutingSchema } from '@db/persistance';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/outing/.env',
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeature([{ name: Outing.name, schema: OutingSchema }]),
  ],
  controllers: [OutingController],
  providers: [OutingService],
})
export class OutingModule {}
