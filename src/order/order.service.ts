import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { FindAllFilterDto } from 'helper/find-all-filter.dto';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private repository: Repository<Order>) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { paymentMethod, shippingPrice, taxPrice, totalPrice } =
      createOrderDto;

    const order: Order = this.repository.create({
      paymentMethod,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    await this.repository.save(order);

    return order;
  }

  async findAll(filterDto: FindAllFilterDto): Promise<Order[]> {
    const { search } = filterDto;

    const query: SelectQueryBuilder<Order> =
      this.repository.createQueryBuilder('order');

    if (search) {
      query.andWhere('LOWER(order._id) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const orders: Order[] = await query.getMany();

    return orders;
  }

  async findOne(id: number): Promise<Order> {
    const found: Order = await this.repository.findOne(+id);

    if (!found) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }

    return found;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const {
      deliveredAt,
      isDelivered,
      isPaid,
      paidAt,
      paymentMethod,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = updateOrderDto;

    const order: Order = await this.findOne(+id);

    if (deliveredAt) {
      order.deliveredAt = deliveredAt;
    }

    if (isDelivered) {
      order.isDelivered = isDelivered;
    }

    if (isPaid) {
      order.isPaid = isPaid;
    }

    if (paidAt) {
      order.paidAt = paidAt;
    }

    if (paymentMethod) {
      order.paymentMethod = paymentMethod;
    }

    if (shippingPrice) {
      order.shippingPrice = shippingPrice;
    }

    if (taxPrice) {
      order.taxPrice = taxPrice;
    }

    if (totalPrice) {
      order.totalPrice = totalPrice;
    }

    await this.repository.save(order);

    return order;
  }

  async remove(id: number): Promise<void> {
    const result: DeleteResult = await this.repository.delete(+id);

    if (result.affected === 0) {
      throw new NotFoundException(`Order with "${id}" not found`);
    }
  }
}
