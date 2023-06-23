import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './Entities/PrismaOrm/prisma.module';
import { CustomerModule } from './Entities/Customer/customer.module';
import { OfferModule } from './Entities/Offer/offer.module';
import { VoucherDataModule } from './Entities/Voucher-Data/voucher-data.module';
import rateLimit from 'express-rate-limit';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CustomerModule,
    OfferModule,
    VoucherDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        rateLimit({
          windowMs: 60 * 1000, // 1 minute
          max: 100, // limit each IP to 100 requests per windowMs
        }),
      )
      .forRoutes('*');
  }
}
