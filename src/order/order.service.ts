import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FindAllFilterDto } from 'src/products/dto/find-all-filter.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private repository: Repository<Order>) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const {
      date,
      dateTime,
      deliveredAt,
      isDelivered,
      isPaid,
      orderItems,
      paidAt,
      paymentMethod,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = createOrderDto;

    const order: Order = this.repository.create({
      date,
      dateTime,
      deliveredAt,
      isDelivered,
      isPaid,
      orderItems,
      paidAt,
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

    const query = this.repository.createQueryBuilder('order');

    if (search) {
      query.andWhere('LOWER(order._id) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const orders = await query.getMany();

    return orders;
  }

  async findOne(id: number): Promise<Order> {
    const found = await this.repository.findOne(+id);

    if (!found) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }

    return found;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const {
      date,
      dateTime,
      deliveredAt,
      isDelivered,
      isPaid,
      orderItems,
      paidAt,
      paymentMethod,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = updateOrderDto;

    const order = await this.findOne(+id);

    if (date) {
      order.date = date;
    }

    if (dateTime) {
      order.dateTime = dateTime;
    }

    if (deliveredAt) {
      order.deliveredAt = deliveredAt;
    }

    if (isDelivered) {
      order.isDelivered = isDelivered;
    }

    if (isPaid) {
      order.isPaid = isPaid;
    }

    if (orderItems) {
      order.orderItems = orderItems;
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
    const result = await this.repository.delete(+id);

    if (result.affected === 0) {
      throw new NotFoundException(`Order with "${id}" not found`);
    }
  }
}
