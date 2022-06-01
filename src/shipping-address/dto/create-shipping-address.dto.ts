import { IsNotEmpty } from 'class-validator';

export class CreateShippingAddressDto {
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  postalCode: string;

  @IsNotEmpty()
  country: string;
}
