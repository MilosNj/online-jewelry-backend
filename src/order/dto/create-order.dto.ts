import { IsNotEmpty } from 'class-validator';

import { OrderItem } from 'src/order-item/entities/order-item.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  orderItems: OrderItem[];

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  dateTime: Date;
}
