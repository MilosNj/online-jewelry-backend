import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { FindAllFilterDto } from 'src/products/dto/find-all-filter.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  findAll(@Query() filterDto: FindAllFilterDto): Promise<Review[]> {
    return this.reviewService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.reviewService.remove(+id);
  }
}
