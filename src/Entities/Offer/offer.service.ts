import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaOrm/prisma.service';
import { CreateOfferDto } from '../../DTOs/CreateOfferDto';

@Injectable()
export class OfferService {
  constructor(private prisma: PrismaService) {}

  async create(offerData: CreateOfferDto): Promise<object> {
    try {
      const newOffer = await this.prisma.offer.create({
        data: offerData,
        select: {
          id: true,
          name: true,
          discount: true,
        },
      });
      return {
        status: true,
        data: newOffer,
      };
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }
}
