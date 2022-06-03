import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  name: string;

  @Column({ default: 0.0, type: 'double precision', scale: 2 })
  rating: number;

  @Column()
  comment: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'timestamptz' })
  dateTime: Date;

  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product;
}
