import {
  IsCurrency,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateOutingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  budget: number;

  @IsUrl()
  link?: string;

  @IsString()
  @Length(3, 3)
  @IsNotEmpty()
  currency: string;
}
