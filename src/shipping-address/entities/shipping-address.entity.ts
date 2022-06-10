import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Order } from 'src/order/entities/order.entity';

@Entity()
export class ShippingAddress {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  postalCode: string;

  @Column()
  country: string;

  // @OneToOne(() => Order, (order) => order.shippingAddress)
  // order: Order;
}
