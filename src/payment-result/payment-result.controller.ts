import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { PaymentResultService } from './payment-result.service';
import { CreatePaymentResultDto } from './dto/create-payment-result.dto';
import { UpdatePaymentResultDto } from './dto/update-payment-result.dto';
import { PaymentResult } from './entities/payment-result.entity';
import { FindAllFilterDto } from 'src/products/dto/find-all-filter.dto';

@Controller('payment-result')
export class PaymentResultController {
  constructor(private readonly paymentResultService: PaymentResultService) {}

  @Post()
  create(
    @Body() createPaymentResultDto: CreatePaymentResultDto,
  ): Promise<PaymentResult> {
    return this.paymentResultService.create(createPaymentResultDto);
  }

  @Get()
  findAll(filterDto: FindAllFilterDto): Promise<PaymentResult[]> {
    return this.paymentResultService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PaymentResult> {
    return this.paymentResultService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentResultDto: UpdatePaymentResultDto,
  ): Promise<PaymentResult> {
    return this.paymentResultService.update(+id, updatePaymentResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.paymentResultService.remove(+id);
  }
}
