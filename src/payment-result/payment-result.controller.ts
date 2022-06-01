import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentResultService } from './payment-result.service';
import { CreatePaymentResultDto } from './dto/create-payment-result.dto';
import { UpdatePaymentResultDto } from './dto/update-payment-result.dto';

@Controller('payment-result')
export class PaymentResultController {
  constructor(private readonly paymentResultService: PaymentResultService) {}

  @Post()
  create(@Body() createPaymentResultDto: CreatePaymentResultDto) {
    return this.paymentResultService.create(createPaymentResultDto);
  }

  @Get()
  findAll() {
    return this.paymentResultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentResultService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentResultDto: UpdatePaymentResultDto) {
    return this.paymentResultService.update(+id, updatePaymentResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentResultService.remove(+id);
  }
}
