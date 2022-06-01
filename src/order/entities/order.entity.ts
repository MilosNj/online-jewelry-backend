import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  orderItems: OrderItem[];

  // add shippingAddress resource

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'timestamptz' })
  dateTime: Date;

  @ManyToOne((_type) => User, (user) => user.name, { eager: false })
  user: User;
}
