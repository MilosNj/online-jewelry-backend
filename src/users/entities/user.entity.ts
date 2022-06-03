import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/order/entities/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'timestamptz' })
  dateTime: Date;

  @OneToMany(() => Product, (product) => product.user, { eager: true })
  products: Product[];

  @OneToMany(() => Order, (order) => order.user, { eager: true })
  orders: Order[];
}
