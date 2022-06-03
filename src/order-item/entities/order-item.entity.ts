import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/order/entities/order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  quantity: number;

  @Column()
  image: string;

  @Column({ type: 'double precision', scale: 2, default: 0.0 })
  price: number;

  @OneToOne(() => Product, (product) => product.orderItem, { eager: true })
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;
}
