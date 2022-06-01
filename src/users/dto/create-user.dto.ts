import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  isAdmin: boolean;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  dateTime: Date;
}
