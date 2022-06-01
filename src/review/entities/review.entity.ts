import { Column, Entity } from 'typeorm';

@Entity()
export class Review {
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
}
