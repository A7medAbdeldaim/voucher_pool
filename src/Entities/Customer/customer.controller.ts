import {
  applyDecorators,
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateCustomerDto,
  GetCustomerByEmailDto,
} from '../../DTOs/CustomerDto';
import { CustomerService } from './customer.service';
import {
  customerCreationTags,
  customerLoadTags,
} from '../../SwaggerDocs/Customer/customer-docs';

@Controller('customer')
export class CustomerController {
  constructor(private service: CustomerService) {}
  @Post('create')
  @applyDecorators(...customerCreationTags())
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() customerDto: CreateCustomerDto): Promise<object> {
    return this.service.create(customerDto);
  }

  @Get('get_customer_data_by_email')
  @applyDecorators(...customerLoadTags())
  @UsePipes(new ValidationPipe({ transform: true }))
  getCustomerByEmail(
    @Body() customerDto: GetCustomerByEmailDto,
  ): Promise<object> {
    return this.service.getCustomerByEmail(customerDto);
  }
}
