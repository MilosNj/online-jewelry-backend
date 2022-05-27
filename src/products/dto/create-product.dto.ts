import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  countInStock: number;
}
