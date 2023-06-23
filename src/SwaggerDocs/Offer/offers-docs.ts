// offers-docs.ts

import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOfferDto } from '../../DTOs/CreateOfferDto';

export const offersTags = () => {
  return [
    ApiOperation({
      summary: 'Create a new offer with discount',
    }),
    ApiResponse({
      status: 201,
      description: 'Offer is created',
    }),
    ApiResponse({ status: 400, description: 'Validation Error, Bad Request' }),
    ApiBody({
      type: CreateOfferDto,
      description: 'The name of the offer and its discount',
    }),
  ];
};
