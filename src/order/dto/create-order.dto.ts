import { IsNotEmpty } from 'class-validator';

import { OrderItem } from 'src/order-item/entities/order-item.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  orderItems: OrderItem[];

  @IsNotEmpty()
  paymentMethod: string;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  dateTime: Date;

  @IsNotEmpty()
  taxPrice: number;

  @IsNotEmpty()
  shippingPrice: number;

  @IsNotEmpty()
  totalPrice: number;

  @IsNotEmpty()
  isPaid: boolean;

  paidAt: Date;

  @IsNotEmpty()
  isDelivered: boolean;

  deliveredAt: Date;
}
