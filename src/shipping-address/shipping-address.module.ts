import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShippingAddressService } from './shipping-address.service';
import { ShippingAddressController } from './shipping-address.controller';
import { ShippingAddress } from './entities/shipping-address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingAddress])],
  controllers: [ShippingAddressController],
  providers: [ShippingAddressService],
})
export class ShippingAddressModule {}
