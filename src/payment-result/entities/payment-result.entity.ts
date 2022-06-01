import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Order } from 'src/order/entities/order.entity';

@Entity()
export class PaymentResult {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  status: string;

  @Column()
  update_time: string;

  @Column()
  email_address: string;

  @OneToOne((_type) => Order, (order) => order.paymentResult, { eager: false })
  order: Order;
}
