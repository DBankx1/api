import { instanceToPlain } from 'class-transformer';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class LoginUserWithPhoneDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  toString(): string {
    return JSON.stringify(instanceToPlain(this));
  }
}
