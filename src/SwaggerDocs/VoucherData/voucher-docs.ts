// voucher-docs.ts

import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GenerateVoucherDto, ValidateVoucherDto } from '../../DTOs/VoucherDtos';

export const voucherGenerationTags = () => {
  return [
    ApiOperation({
      summary: 'Generate vouchers for specific offer for all customers',
    }),
    ApiResponse({ status: 201, description: 'Vouchers are created' }),
    ApiResponse({ status: 400, description: 'Validation Error, Bad Request' }),
    ApiResponse({ status: 404, description: 'Offer Not Found' }),
    ApiBody({
      type: GenerateVoucherDto,
      description: 'The offer and expiration date',
    }),
  ];
};

export const voucherValidationTags = () => {
  return [
    ApiOperation({
      summary: 'Validate a voucher by customer and update it to be used',
    }),
    ApiResponse({
      status: 200,
      description: 'Vouchers is valid and used successfully',
    }),
    ApiResponse({ status: 400, description: 'Validation Error, Bad Request' }),
    ApiResponse({
      status: 404,
      description: 'Voucher or Customer are not exists',
    }),
    ApiBody({
      type: ValidateVoucherDto,
      description: 'The offer and expiration date',
    }),
  ];
};
