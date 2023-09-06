import { instanceToPlain } from 'class-transformer';
import { IsAlpha, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class RegisterUserWithPhoneDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  lastName: string;

  toString(): string {
    return JSON.stringify(instanceToPlain(this));
  }
}
