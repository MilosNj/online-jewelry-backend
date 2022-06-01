import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { Review } from 'src/review/entities/review.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column()
  brand: string;

  @Column()
  category: string;

  @Column({ type: 'double precision', scale: 2, default: 0.0 })
  price: number;

  @Column({ default: 0 })
  countInStock: number;

  @Column()
  reviews: Review[];

  @Column({ type: 'double precision', scale: 2, default: 0.0 })
  rating: number;

  @Column({ default: 0 })
  numOfReviews: number;

  @ManyToOne((_type) => User, (user) => user.products, { eager: false })
  user: User;

  @OneToOne((_type) => OrderItem, (orderItem) => orderItem.product, {
    eager: false,
  })
  orderItem: OrderItem;
}
