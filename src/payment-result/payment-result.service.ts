import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllFilterDto } from 'helper/find-all-filter.dto';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';

import { CreatePaymentResultDto } from './dto/create-payment-result.dto';
import { UpdatePaymentResultDto } from './dto/update-payment-result.dto';
import { PaymentResult } from './entities/payment-result.entity';

@Injectable()
export class PaymentResultService {
  constructor(
    @InjectRepository(PaymentResult)
    private repository: Repository<PaymentResult>,
  ) {}

  async create(
    createPaymentResultDto: CreatePaymentResultDto,
  ): Promise<PaymentResult> {
    const { email_address, status, update_time } = createPaymentResultDto;

    const paymentResult: PaymentResult = this.repository.create({
      email_address,
      status,
      update_time,
    });

    await this.repository.save(paymentResult);

    return paymentResult;
  }

  async findAll(filterDto: FindAllFilterDto): Promise<PaymentResult[]> {
    const { search } = filterDto;

    const query: SelectQueryBuilder<PaymentResult> =
      this.repository.createQueryBuilder('paymentResult');

    if (search) {
      query.andWhere('LOWER(paymentResult._id) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const paymentResults: PaymentResult[] = await query.getMany();

    return paymentResults;
  }

  async findOne(id: number): Promise<PaymentResult> {
    const found: PaymentResult = await this.repository.findOne(+id);

    if (!found) {
      throw new NotFoundException(`Payment result with ID "${id}" not found`);
    }

    return found;
  }

  async update(
    id: number,
    updatePaymentResultDto: UpdatePaymentResultDto,
  ): Promise<PaymentResult> {
    const { email_address, status, update_time } = updatePaymentResultDto;

    const paymentResult: PaymentResult = await this.findOne(+id);

    if (email_address) {
      paymentResult.email_address = email_address;
    }

    if (status) {
      paymentResult.status = status;
    }

    if (update_time) {
      paymentResult.update_time = update_time;
    }

    await this.repository.save(paymentResult);

    return paymentResult;
  }

  async remove(id: number): Promise<void> {
    const result: DeleteResult = await this.repository.delete(+id);

    if (result.affected === 0) {
      throw new NotFoundException(`Payment result with "${id}" not found`);
    }
  }
}
