import { Column, Entity, OneToOne } from 'typeorm';

import { Order } from 'src/order/entities/order.entity';

@Entity()
export class PaymentResult {
  @Column()
  id: string;

  @Column()
  status: string;

  @Column()
  update_time: string;

  @Column()
  email_address: string;

  @OneToOne((_type) => Order, (order) => order.paymentResult, { eager: false })
  order: Order;
}
