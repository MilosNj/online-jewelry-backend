import { PartialType } from '@nestjs/mapped-types';

import { CreateReviewDto } from './create-review.dto';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  name: string;
  rating: number;
  comment: string;
  date: string;
  dateTime: Date;
}
