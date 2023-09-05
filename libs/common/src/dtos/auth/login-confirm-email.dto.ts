import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmLoginUserWithEmailDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  toString() {
    return JSON.stringify({
      token: this.token,
    });
  }
}
