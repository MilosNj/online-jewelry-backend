import { IsOptional, IsString } from 'class-validator';

export class FindAllFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
