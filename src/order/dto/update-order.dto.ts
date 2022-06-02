import { PartialType } from '@nestjs/mapped-types';

import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
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
