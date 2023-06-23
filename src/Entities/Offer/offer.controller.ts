import {
  applyDecorators,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from '../../DTOs/CreateOfferDto';
import { offersTags } from '../../SwaggerDocs/Offer/offers-docs';

@Controller('offer')
export class OfferController {
  constructor(private service: OfferService) {}
  @Post('create')
  @applyDecorators(...offersTags())
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() offerDto: CreateOfferDto): Promise<object> {
    return this.service.create(offerDto);
  }
}
