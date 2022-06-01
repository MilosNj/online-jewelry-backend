import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';
import { FindAllFilterDto } from 'src/products/dto/find-all-filter.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private repository: Repository<OrderItem>,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const { image, name, price, quantity } = createOrderItemDto;

    const orderItem: OrderItem = this.repository.create({
      image,
      name,
      price,
      quantity,
    });

    await this.repository.save(orderItem);

    return orderItem;
  }

  async findAll(filterDto: FindAllFilterDto): Promise<OrderItem[]> {
    const { search } = filterDto;

    const query = this.repository.createQueryBuilder('orderItem');

    if (search) {
      query.andWhere('LOWER(orderItem._id) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const orderItems = await query.getMany();

    return orderItems;
  }

  async findOne(id: number): Promise<OrderItem> {
    const found = await this.repository.findOne(+id);

    if (!found) {
      throw new NotFoundException(`Order item with ID "${id}" not found`);
    }

    return found;
  }

  async update(
    id: number,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    const { image, name, price, quantity } = updateOrderItemDto;

    const orderItem = await this.findOne(+id);

    if (image) {
      orderItem.image = image;
    }

    if (name) {
      orderItem.name = name;
    }

    if (price) {
      orderItem.price = price;
    }

    if (quantity) {
      orderItem.quantity = quantity;
    }

    await this.repository.save(orderItem);

    return orderItem;
  }

  async remove(id: number): Promise<void> {
    const result = await this.repository.delete(+id);

    if (result.affected === 0) {
      throw new NotFoundException(`Order item with "${id}" not found`);
    }
  }
}
