import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { OutingModule } from './outing/outing.module';

@Module({
  imports: [AuthModule, OutingModule],
})
export class AppModule {}
