import { PartialType } from '@nestjs/mapped-types';

import { CreateOrderItemDto } from './create-order-item.dto';

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
  name: string;
  quantity: number;
  image: string;
  price: number;
}
