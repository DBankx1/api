import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateOutingDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @IsOptional()
  budget?: number;

  @IsUrl()
  @IsOptional()
  link?: string;
}
