import { PartialType } from '@nestjs/mapped-types';

import { CreateOrderDto } from './create-order.dto';
import { OrderItem } from 'src/order-item/entities/order-item.entity';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  orderItems: OrderItem[];
  paymentMethod: string;
  date: string;
  dateTime: Date;
  taxPrice: number;
  shippingPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
}
