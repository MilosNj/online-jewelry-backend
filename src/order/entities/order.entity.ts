import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { ShippingAddress } from 'src/shipping-address/entities/shipping-address.entity';
import { PaymentResult } from 'src/payment-result/entities/payment-result.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  paymentMethod: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'timestamptz' })
  dateTime: Date;

  @Column({ type: 'double precision', scale: 2, default: 0.0 })
  taxPrice: number;

  @Column({ type: 'double precision', scale: 2, default: 0.0 })
  shippingPrice: number;

  @Column({ type: 'double precision', scale: 2, default: 0.0 })
  totalPrice: number;

  @Column({ default: false })
  isPaid: boolean;

  @Column()
  paidAt: Date;

  @Column({ default: false })
  isDelivered: boolean;

  @Column()
  deliveredAt: Date;

  @ManyToOne((_type) => User, (user) => user.name, { eager: false })
  user: User;

  @OneToOne((_type) => PaymentResult, (paymentResult) => paymentResult.order, {
    eager: true,
  })
  paymentResult: PaymentResult;

  @OneToOne(
    (_type) => ShippingAddress,
    (shippingAddress) => shippingAddress.order,
    { eager: true },
  )
  shippingAddress: ShippingAddress;

  @OneToMany((_type) => OrderItem, (orderItem) => orderItem.order, {
    eager: true,
  })
  orderItems: OrderItem[];
}
