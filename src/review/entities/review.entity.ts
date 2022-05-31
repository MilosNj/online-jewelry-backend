import { Column, Entity } from 'typeorm';

@Entity()
export class Review {
  @Column()
  name: string;

  @Column({ default: 0, type: 'double precision', scale: 2 })
  rating: number;

  @Column()
  comment: string;
}
