import { instanceToPlain } from 'class-transformer';
import { IsAlpha, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserWithEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

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
