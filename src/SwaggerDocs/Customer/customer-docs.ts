// customer-docs.ts

import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CreateCustomerDto,
  GetCustomerByEmailDto,
} from '../../DTOs/CustomerDto';

export const customerLoadTags = () => {
  return [
    ApiOperation({
      summary: 'Get customer data by the email',
    }),
    ApiResponse({
      status: 200,
      description: 'Customer is found',
    }),
    ApiResponse({ status: 400, description: 'Validation Error, Bad Request' }),
    ApiResponse({
      status: 404,
      description: 'Customer is not exists',
    }),
    ApiBody({
      type: GetCustomerByEmailDto,
      description: 'Email of the customer',
    }),
  ];
};

export const customerCreationTags = () => {
  return [
    ApiOperation({
      summary: 'Create a new customer',
    }),
    ApiResponse({
      status: 201,
      description: 'Customer is created successfully',
    }),
    ApiResponse({ status: 400, description: 'Validation Error, Bad Request' }),
    ApiBody({
      type: CreateCustomerDto,
      description: 'Customer name and Email',
    }),
  ];
};
