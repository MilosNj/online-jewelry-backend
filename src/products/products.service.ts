import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { FindAllFilterDto } from './dto/find-all-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const {
      name,
      image,
      description,
      brand,
      category,
      price,
      countInStock,
      rating,
      numOfReviews,
    } = createProductDto;

    const product: Product = this.repository.create({
      name,
      image,
      description,
      brand,
      category,
      price,
      countInStock,
      rating,
      numOfReviews,
    });

    await this.repository.save(product);

    return product;
  }

  async findAll(filterDto: FindAllFilterDto): Promise<Product[]> {
    const { search } = filterDto;

    const query = this.repository.createQueryBuilder('product');

    if (search) {
      query.andWhere('LOWER(product.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const products = await query.getMany();

    return products;
  }

  async findOne(id: number): Promise<Product> {
    const found = await this.repository.findOne(+id);

    if (!found) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return found;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const {
      name,
      image,
      description,
      brand,
      category,
      price,
      countInStock,
      rating,
      numOfReviews,
    } = updateProductDto;

    const product = await this.findOne(+id);

    if (name) {
      product.name = name;
    }

    if (image) {
      product.image = image;
    }

    if (description) {
      product.description = description;
    }

    if (brand) {
      product.brand = brand;
    }

    if (category) {
      product.category = category;
    }

    if (price) {
      product.price = price;
    }

    if (countInStock) {
      product.countInStock = countInStock;
    }

    if (rating) {
      product.rating = rating;
    }

    if (numOfReviews) {
      product.numOfReviews = numOfReviews;
    }

    await this.repository.save(product);

    return product;
  }

  async remove(id: number): Promise<void> {
    const result = await this.repository.delete(+id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product with "${id}" not found`);
    }
  }
}
