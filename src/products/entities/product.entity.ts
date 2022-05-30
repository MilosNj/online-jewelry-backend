import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/users/entities/user.entity';

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

  @Column({ type: 'double precision', scale: 2 })
  price: number;

  @Column()
  countInStock: number;

  @Column({ type: 'double precision', scale: 2 })
  rating: number;

  @Column()
  numOfReviews: number;

  // @ManyToOne((_type) => User, (user) => user.products, { eager: false })
  // user: User;
}
