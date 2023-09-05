import { Module } from '@nestjs/common';
import { StytchService } from './stytch.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '',
    }),
  ],
  providers: [StytchService],
  exports: [StytchService],
})
export class StytchModule {}
