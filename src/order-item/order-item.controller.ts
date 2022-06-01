import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { FindAllFilterDto } from 'src/products/dto/find-all-filter.dto';
import { OrderItem } from './entities/order-item.entity';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    return this.orderItemService.create(createOrderItemDto);
  }

  @Get()
  findAll(@Query() filterDto: FindAllFilterDto): Promise<OrderItem[]> {
    return this.orderItemService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<OrderItem> {
    return this.orderItemService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    return this.orderItemService.update(+id, updateOrderItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.orderItemService.remove(+id);
  }
}
