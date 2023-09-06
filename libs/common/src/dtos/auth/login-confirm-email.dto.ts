import { instanceToPlain } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmLoginUserWithEmailDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  toString(): string {
    return JSON.stringify(instanceToPlain(this));
  }
}
