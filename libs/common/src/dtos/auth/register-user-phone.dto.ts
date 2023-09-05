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

  toString() {
    return JSON.stringify({
      phone: this.phone,
      firstName: this.firstName,
      lastName: this.lastName,
    });
  }
}
