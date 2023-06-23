import { Test, TestingModule } from '@nestjs/testing';
import { OfferController } from './offer.controller';
import * as request from 'supertest';
import { OfferModule } from './offer.module';
import { PrismaService } from '../PrismaOrm/prisma.service';
import { OfferService } from './offer.service';
import { PrismaModule } from '../PrismaOrm/prisma.module';
import { AppModule } from '../../app.module';
import { ConfigService } from '@nestjs/config';
import { AppService } from '../../app.service';

describe('Test Offer Controller Logic', () => {
  let controller: OfferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OfferModule, PrismaModule, AppModule],
      providers: [OfferService, PrismaService, ConfigService, AppService],
      controllers: [OfferController],
    }).compile();

    controller = module.get<OfferController>(OfferController);
  });

  it('create function should be defined', () => {
    expect(typeof controller.create).toBeDefined();
  });
});

describe('Test Offer Logic', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [OfferModule, PrismaModule, AppModule],
      providers: [OfferService, PrismaService, ConfigService, AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should return 201 Success as we are passing correct parameters', async () => {
    const response = await request(app.getHttpServer())
      .post('/offer/create')
      .send({
        name: 'data',
        discount: 20,
      });
    expect(response.status).toBe(201);
  });

  it('Should return 400 bad request as we are passing wrong discount', async () => {
    const response = await request(app.getHttpServer())
      .post('/offer/create')
      .send({
        name: 'data',
        discount: '20%',
      });
    expect(response.status).toBe(400);
  });

  it('Should return 201 as we are passing correct data', async () => {
    const response = await request(app.getHttpServer())
      .post('/offer/create')
      .send({
        name: 'Offer 1',
        discount: 20,
      });
    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true);
    expect(response.body.data.discount).toBe(20);
    expect(response.body.data.name).toBe('Offer 1');
  });
});
