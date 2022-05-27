import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/users/entities/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  _id: string;

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

  @Column()
  price: number;

  @Column()
  countInStock: number;

  @Column()
  rating: number;

  @Column()
  numOfReviews: number;

  @ManyToOne((_type) => User, (user) => user.products, { eager: false })
  user: User;
}
