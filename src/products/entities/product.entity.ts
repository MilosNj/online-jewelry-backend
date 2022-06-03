import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
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

  @Column({ type: 'double precision', scale: 2, default: 0.0 })
  rating: number;

  @Column({ default: 0 })
  numOfReviews: number;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @OneToOne(() => OrderItem, (orderItem) => orderItem.product)
  orderItem: OrderItem;

  @OneToMany(() => Review, (review) => review.product, { eager: true })
  reviews: Review[];
}
