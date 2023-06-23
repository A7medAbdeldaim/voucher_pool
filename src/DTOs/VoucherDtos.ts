import {
  IsNotEmpty,
  IsInt,
  IsDateString,
  IsEmail,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class GenerateVoucherDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  offer_id: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  expiration_date: Date;
}

class ValidateVoucherDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  voucher_code: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}

export { ValidateVoucherDto, GenerateVoucherDto };
