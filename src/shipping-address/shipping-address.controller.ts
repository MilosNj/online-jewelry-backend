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

import { ShippingAddressService } from './shipping-address.service';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { ShippingAddress } from './entities/shipping-address.entity';
// import { FindAllFilterDto } from 'src/products/dto/find-all-filter.dto';

@Controller('shipping-address')
export class ShippingAddressController {
  constructor(
    private readonly shippingAddressService: ShippingAddressService,
  ) {}

  @Post()
  create(
    @Body() createShippingAddressDto: CreateShippingAddressDto,
  ): Promise<ShippingAddress> {
    return this.shippingAddressService.create(createShippingAddressDto);
  }

  // @Get()
  // findAll(@Query() filterDto: FindAllFilterDto): Promise<ShippingAddress[]> {
  //   return this.shippingAddressService.findAll(filterDto);
  // }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ShippingAddress> {
    return this.shippingAddressService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShippingAddressDto: UpdateShippingAddressDto,
  ): Promise<ShippingAddress> {
    return this.shippingAddressService.update(+id, updateShippingAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.shippingAddressService.remove(+id);
  }
}
