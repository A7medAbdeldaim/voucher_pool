import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}

class GetCustomerByEmailDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}

export { CreateCustomerDto, GetCustomerByEmailDto };
