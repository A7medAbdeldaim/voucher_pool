import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaOrm/prisma.service';
import { GenerateVoucherDto, ValidateVoucherDto } from '../../DTOs/VoucherDtos';
import * as crypto from 'crypto';

@Injectable()
export class VoucherDataService {
  constructor(private prisma: PrismaService) {}

  async generate(voucherData: GenerateVoucherDto): Promise<object> {
    try {
      // Get Offer data from offerID
      const offerData = await this.prisma.offer.findFirstOrThrow({
        where: {
          id: voucherData.offer_id,
        },
        select: {
          id: true,
          name: true,
          discount: true,
        },
      });

      // Get all customers
      const customers = await this.prisma.customer.findMany({
        select: {
          id: true,
        },
      });

      // Loop through all customers
      for (const customer of customers) {
        await this.prisma.voucherData.create({
          data: {
            name: this.generateVoucherCode(offerData.id, customer.id),
            offer_id: offerData.id,
            customer_id: customer.id,
            expiration_at: new Date(voucherData.expiration_date),
          },
        });
      }

      return {
        status: true,
        data: [],
      };
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }

  async validate_voucher(validateVoucherDto: ValidateVoucherDto) {
    try {
      // Get Customer Id from Email
      const customerData = await this.prisma.customer.findFirstOrThrow({
        where: {
          email: validateVoucherDto.email,
        },
        select: {
          id: true,
        },
      });

      // Get Voucher data from Voucher Data Table
      const voucherData = await this.prisma.voucherData.findFirstOrThrow({
        where: {
          customer_id: customerData.id,
          name: validateVoucherDto.voucher_code,
        },
        include: { offer: true },
      });

      if (voucherData.used_at) {
        return {
          status: false,
          message: 'Voucher Code is Used',
        };
      } else if (new Date(voucherData.expiration_at) < new Date()) {
        return {
          status: false,
          message: 'Voucher Code is Expired',
        };
      }

      // The voucher is valid
      // Set Used Date
      await this.prisma.voucherData.update({
        where: {
          id: voucherData.id,
        },
        data: {
          used_at: new Date(),
        },
      });

      return {
        status: true,
        message: 'Voucher is valid',
        discount: voucherData.offer.discount,
      };
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }

  generateVoucherCode(offerId: number, customerId: number): string {
    const timestamp: number = Date.now();
    const hash: crypto.Hash = crypto.createHash('sha256');
    hash.update(`${timestamp}-${offerId}-${customerId}`);
    const voucher = hash.digest('hex');
    return voucher.substring(0, 10);
  }
}
