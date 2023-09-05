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

  toString() {
    return JSON.stringify({
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    });
  }
}
