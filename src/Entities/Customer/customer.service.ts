import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaOrm/prisma.service';
import {
  CreateCustomerDto,
  GetCustomerByEmailDto,
} from '../../DTOs/CustomerDto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async create(customerData: CreateCustomerDto): Promise<object> {
    try {
      const newCustomer = await this.prisma.customer.create({
        data: customerData,
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return {
        status: true,
        data: newCustomer,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        return {
          status: false,
          message: 'Duplicated Email',
        };
      }
      return {
        status: false,
        message: error.message,
      };
    }
  }

  async getCustomerByEmail(
    customerData: GetCustomerByEmailDto,
  ): Promise<object> {
    try {
      const vouchers = await this.prisma.voucherData.findMany({
        where: {
          customer: {
            email: customerData.email,
          },
        },
        select: {
          name: true,
          expiration_at: true,
          used_at: true,
          offer: {
            select: {
              name: true,
              discount: true,
            },
          },
        },
      });

      return {
        status: true,
        data: vouchers,
      };
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }
}
