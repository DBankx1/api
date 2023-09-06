import { instanceToPlain } from 'class-transformer';
import { IsEnum } from 'class-validator';

export enum SearchOutingType {
  All = 'All',
  Creator = 'Creator',
  Invited = 'Invited',
}

export class SearchOutingDto {
  @IsEnum(SearchOutingType)
  type: SearchOutingType;
}
