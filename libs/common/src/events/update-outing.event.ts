import { instanceToPlain } from 'class-transformer';
import { UpdateOutingDto } from '../dtos/outing';
import { IsNotEmpty } from 'class-validator';

export class UpdateOutingEvent extends UpdateOutingDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  id: string;

  toString() {
    return JSON.stringify(instanceToPlain(this));
  }
}
