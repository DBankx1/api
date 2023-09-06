import { instanceToPlain } from 'class-transformer';
import { SearchOutingDto } from '../dtos/outing';

export class SearchOutingEvent extends SearchOutingDto {
  userId?: string;

  toString(): string {
    return JSON.stringify(instanceToPlain(this));
  }
}
