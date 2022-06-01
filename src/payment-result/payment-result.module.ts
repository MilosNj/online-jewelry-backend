import { Module } from '@nestjs/common';
import { PaymentResultService } from './payment-result.service';
import { PaymentResultController } from './payment-result.controller';

@Module({
  controllers: [PaymentResultController],
  providers: [PaymentResultService]
})
export class PaymentResultModule {}
