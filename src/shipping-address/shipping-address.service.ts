import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { ShippingAddress } from './entities/shipping-address.entity';
import { FindAllFilterDto } from 'src/products/dto/find-all-filter.dto';

@Injectable()
export class ShippingAddressService {
  constructor(
    @InjectRepository(ShippingAddress)
    private repository: Repository<ShippingAddress>,
  ) {}

  async create(
    createShippingAddressDto: CreateShippingAddressDto,
  ): Promise<ShippingAddress> {
    const { address, city, country, postalCode } = createShippingAddressDto;

    const shippingAddress: ShippingAddress = this.repository.create({
      address,
      city,
      country,
      postalCode,
    });

    await this.repository.save(shippingAddress);

    return shippingAddress;
  }

  async findAll(filterDto: FindAllFilterDto): Promise<ShippingAddress[]> {
    const { search } = filterDto;

    const query = this.repository.createQueryBuilder('shippingAddress');

    if (search) {
      query.andWhere('LOWER(shippingAddress._id) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const shippingAddresses: ShippingAddress[] = await query.getMany();

    return shippingAddresses;
  }

  async findOne(id: number): Promise<ShippingAddress> {
    const found: ShippingAddress = await this.repository.findOne(+id);

    if (!found) {
      throw new NotFoundException(`Shipping address with ID "${id}" not found`);
    }

    return found;
  }

  async update(
    id: number,
    updateShippingAddressDto: UpdateShippingAddressDto,
  ): Promise<ShippingAddress> {
    const { address, city, country, postalCode } = updateShippingAddressDto;

    const shippingAddress: ShippingAddress = await this.findOne(+id);

    if (address) {
      shippingAddress.address = address;
    }

    if (city) {
      shippingAddress.city = city;
    }

    if (country) {
      shippingAddress.country = country;
    }

    if (postalCode) {
      shippingAddress.postalCode = postalCode;
    }

    await this.repository.save(shippingAddress);

    return shippingAddress;
  }

  async remove(id: number): Promise<void> {
    const result: DeleteResult = await this.repository.delete(+id);

    if (result.affected === 0) {
      throw new NotFoundException(`Shipping address with "${id}" not found`);
    }
  }
}
