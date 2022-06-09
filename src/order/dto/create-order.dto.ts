import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  paymentMethod: string;

  @IsNotEmpty()
  taxPrice: number;

  @IsNotEmpty()
  shippingPrice: number;

  @IsNotEmpty()
  totalPrice: number;
}
