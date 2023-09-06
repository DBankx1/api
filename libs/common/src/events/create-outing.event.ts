import { instanceToPlain } from 'class-transformer';
import { CreateOutingDto } from '../dtos/outing';

export class CreateOutingEvent extends CreateOutingDto {
  userId: string;

  toString(): string {
    return JSON.stringify(instanceToPlain(this));
  }
}
