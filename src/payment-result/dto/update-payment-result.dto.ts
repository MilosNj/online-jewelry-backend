import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentResultDto } from './create-payment-result.dto';

export class UpdatePaymentResultDto extends PartialType(
  CreatePaymentResultDto,
) {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}
