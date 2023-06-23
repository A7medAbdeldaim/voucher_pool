import {
  applyDecorators,
  Body,
  Controller,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VoucherDataService } from './voucher-data.service';
import { ValidateVoucherDto, GenerateVoucherDto } from '../../DTOs/VoucherDtos';
import {
  voucherGenerationTags,
  voucherValidationTags,
} from '../../SwaggerDocs/VoucherData/voucher-docs';

@Controller('voucher_data')
export class VoucherDataController {
  constructor(private service: VoucherDataService) {}
  @Post('generate_voucher')
  @applyDecorators(...voucherGenerationTags())
  @UsePipes(new ValidationPipe({ transform: true }))
  generate_vouchers(@Body() voucherDto: GenerateVoucherDto): Promise<object> {
    return this.service.generate(voucherDto);
  }

  @Patch('validate_voucher')
  @applyDecorators(...voucherValidationTags())
  @UsePipes(new ValidationPipe({ transform: true }))
  validate_voucher(@Body() voucherDto: ValidateVoucherDto): Promise<object> {
    return this.service.validate_voucher(voucherDto);
  }
}
