import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllFilterDto } from 'src/products/dto/find-all-filter.dto';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';

import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private repository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const { comment, date, dateTime, name, rating } = createReviewDto;

    const review: Review = this.repository.create({
      comment,
      date,
      dateTime,
      name,
      rating,
    });

    await this.repository.save(review);

    return review;
  }

  async findAll(filterDto: FindAllFilterDto): Promise<Review[]> {
    const { search } = filterDto;

    const query: SelectQueryBuilder<Review> =
      this.repository.createQueryBuilder('review');

    if (search) {
      query.andWhere('LOWER(review._id) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const reviews: Review[] = await query.getMany();

    return reviews;
  }

  async findOne(id: number): Promise<Review> {
    const found: Review = await this.repository.findOne(+id);

    if (!found) {
      throw new NotFoundException(`Review with ID "${id}" not found`);
    }

    return found;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const { comment, date, dateTime, name, rating } = updateReviewDto;

    const review: Review = await this.findOne(+id);

    if (comment) {
      review.comment = comment;
    }

    if (date) {
      review.date = date;
    }

    if (dateTime) {
      review.dateTime = dateTime;
    }

    if (name) {
      review.name = name;
    }

    if (rating) {
      review.rating = rating;
    }

    await this.repository.save(review);

    return review;
  }

  async remove(id: number): Promise<void> {
    const result: DeleteResult = await this.repository.delete(+id);

    if (result.affected === 0) {
      throw new NotFoundException(`Order item with "${id}" not found`);
    }
  }
}
