import { IsNotEmpty } from 'class-validator';

import { OrderItem } from 'src/order-item/entities/order-item.entity';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  countInStock: number;

  @IsNotEmpty()
  rating: number;

  @IsNotEmpty()
  numOfReviews: number;

  @IsNotEmpty()
  orderItems: OrderItem[];

  @IsNotEmpty()
  paymentMethod: string;
}
