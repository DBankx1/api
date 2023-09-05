import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class LoginUserWithPhoneDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  toString() {
    return JSON.stringify({
      phone: this.phone,
    });
  }
}
