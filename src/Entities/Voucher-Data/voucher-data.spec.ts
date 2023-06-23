import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { PrismaService } from '../PrismaOrm/prisma.service';
import { PrismaModule } from '../PrismaOrm/prisma.module';
import { AppModule } from '../../app.module';
import { ConfigService } from '@nestjs/config';
import { AppService } from '../../app.service';
import { VoucherDataController } from './voucher-data.controller';
import { VoucherDataModule } from './voucher-data.module';
import { VoucherDataService } from './voucher-data.service';

describe('Test Voucher Data Controller Logic', () => {
  let controller: VoucherDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [VoucherDataModule, PrismaModule, AppModule],
      providers: [VoucherDataService, PrismaService, ConfigService, AppService],
      controllers: [VoucherDataController],
    }).compile();

    controller = module.get<VoucherDataController>(VoucherDataController);
  });

  it('Generate function should be defined', () => {
    expect(typeof controller.generate_vouchers).toBeDefined();
  });

  it('Validate Voucher function should be defined', () => {
    expect(typeof controller.validate_voucher).toBeDefined();
  });
});

describe('Test Generate Voucher Data Logic', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [VoucherDataModule, PrismaModule, AppModule],
      providers: [VoucherDataService, PrismaService, ConfigService, AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should return 201 Success as we are passing correct parameters', async () => {
    const response = await request(app.getHttpServer())
      .post('/voucher_data/generate_voucher')
      .send({
        offer_id: 1,
        expiration_date: '2023-06-01',
      });
    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true);
  });

  it('Should return 400 bad request as we are passing wrong types', async () => {
    const response = await request(app.getHttpServer())
      .post('/voucher_data/generate_voucher')
      .send({
        offer_id: '1',
        expiration_date: '2023-06-01F',
      });
    expect(response.status).toBe(400);
  });
});

describe('Test Validating Voucher Data Logic', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [VoucherDataModule, PrismaModule, AppModule],
      providers: [VoucherDataService, PrismaService, ConfigService, AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should return 400 Bad Request as we are passing empty parameters', async () => {
    const response = await request(app.getHttpServer())
      .patch('/voucher_data/validate_voucher')
      .send();
    expect(response.status).toBe(400);
  });

  it('Should return 200 Success as we are passing incorrect voucher', async () => {
    const response = await request(app.getHttpServer())
      .post('/voucher_data/validate_voucher')
      .send({
        voucher_code: '12',
        email: 'email@data.com',
      });
    expect(response.status).toBe(404);
  });
});
