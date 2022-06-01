import { IsNotEmpty } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  price: number;
}
