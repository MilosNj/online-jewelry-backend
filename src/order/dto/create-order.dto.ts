import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
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
