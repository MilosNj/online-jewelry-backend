import { Injectable } from '@nestjs/common';
import { CreatePaymentResultDto } from './dto/create-payment-result.dto';
import { UpdatePaymentResultDto } from './dto/update-payment-result.dto';

@Injectable()
export class PaymentResultService {
  create(createPaymentResultDto: CreatePaymentResultDto) {
    return 'This action adds a new paymentResult';
  }

  findAll() {
    return `This action returns all paymentResult`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentResult`;
  }

  update(id: number, updatePaymentResultDto: UpdatePaymentResultDto) {
    return `This action updates a #${id} paymentResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentResult`;
  }
}
