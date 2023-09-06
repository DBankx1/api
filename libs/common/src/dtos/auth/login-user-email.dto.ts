import { instanceToPlain } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserWithEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  toString(): string {
    return JSON.stringify(instanceToPlain(this));
  }
}
