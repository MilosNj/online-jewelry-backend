import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @Column({ type: 'double precision', scale: 2, default: 0.0 })
  taxPrice: number;

  @Column({ type: 'double precision', scale: 2, default: 0.0 })
  shippingPrice: number;

  @Column({ type: 'double precision', scale: 2, default: 0.0 })
  totalPrice: number;

  @Column({ default: false })
  isPaid: boolean;

  @UpdateDateColumn()
  paidAt: Date;

  @Column({ default: false })
  isDelivered: boolean;

  @UpdateDateColumn()
  deliveredAt: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  // @OneToOne(() => PaymentResult, (paymentResult) => paymentResult.order, {
  //   eager: true,
  // })
  // paymentResult: PaymentResult;

  // @OneToOne(() => ShippingAddress, (shippingAddress) => shippingAddress.order, {
  //   eager: true,
  // })
  // shippingAddress: ShippingAddress;

  // @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
  //   eager: true,
  // })
  // orderItems: OrderItem[];
}
