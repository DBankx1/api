import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserWithEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  toString() {
    return JSON.stringify({
      email: this.email,
    });
  }
}
