import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentResultService } from './payment-result.service';
import { PaymentResultController } from './payment-result.controller';
import { PaymentResult } from './entities/payment-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentResult])],
  controllers: [PaymentResultController],
  providers: [PaymentResultService],
})
export class PaymentResultModule {}
