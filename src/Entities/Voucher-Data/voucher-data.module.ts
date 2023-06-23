import { Module } from '@nestjs/common';
import { VoucherDataService } from './voucher-data.service';
import { VoucherDataController } from './voucher-data.controller';

@Module({
  providers: [VoucherDataService],
  controllers: [VoucherDataController],
})
export class VoucherDataModule {}
