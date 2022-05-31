import { IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  rating: number;

  @IsNotEmpty()
  comment: string;
}
