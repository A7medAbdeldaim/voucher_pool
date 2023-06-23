import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import * as request from 'supertest';
import { CustomerModule } from './customer.module';
import { PrismaService } from '../PrismaOrm/prisma.service';
import { CustomerService } from './customer.service';
import { PrismaModule } from '../PrismaOrm/prisma.module';
import { AppModule } from '../../app.module';
import { ConfigService } from '@nestjs/config';
import { AppService } from '../../app.service';

describe('Test Customer Controller Logic', () => {
  let controller: CustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CustomerModule, PrismaModule, AppModule],
      providers: [CustomerService, PrismaService, ConfigService, AppService],
      controllers: [CustomerController],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('create function should be defined', () => {
    expect(typeof controller.create).toBeDefined();
  });

  it('getByEmail function should be defined', () => {
    expect(typeof controller.getCustomerByEmail).toBeDefined();
  });
});

describe('Test Customer Creation Logic', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CustomerModule, PrismaModule, AppModule],
      providers: [CustomerService, PrismaService, ConfigService, AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should return 201 Success as we are passing correct parameters', async () => {
    // eslint-disable-next-line
    const response = await request(app.getHttpServer())
      .post('/customer/create')
      .send({
        name: 'data',
        email: 'email@data.com',
      });
    expect(response.status).toBe(201);
  });

  it('Should return 400 bad request as we are passing wrong email', async () => {
    const response = await request(app.getHttpServer())
      .post('/customer/create')
      .send({
        name: 'data',
        email: 'emaildata.com',
      });
    expect(response.status).toBe(400);
  });

  const email: string = Date.now() + '@email.com';
  it('Should return 201 as we are passing correct data', async () => {
    const response = await request(app.getHttpServer())
      .post('/customer/create')
      .send({
        name: 'Person',
        email: email,
      });
    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true);
    expect(response.body.data.email).toBe(email);
    expect(response.body.data.name).toBe('Person');
  });

  it('Should return status false as we are passing duplicated email', async () => {
    const response = await request(app.getHttpServer())
      .post('/customer/create')
      .send({
        name: 'Person',
        email: email,
      });
    expect(response.body.status).toBe(false);
  });
});

describe('Test Customer Getting Data Logic', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CustomerModule, PrismaModule, AppModule],
      providers: [CustomerService, PrismaService, ConfigService, AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should return 400 Bad Request as we are passing empty parameters', async () => {
    const response = await request(app.getHttpServer())
      .get('/customer/get_customer_data_by_email')
      .send();
    expect(response.status).toBe(400);
  });

  it('Should return 200 Success as we are passing correct parameters', async () => {
    // eslint-disable-next-line
    const response = await request(app.getHttpServer())
      .get('/customer/get_customer_data_by_email')
      .send({
        email: 'email@data.com',
      });
    expect(response.status).toBe(200);
  });

  it('Should return 400 bad request as we are passing wrong email', async () => {
    const response = await request(app.getHttpServer())
      .get('/customer/get_customer_data_by_email')
      .send({
        email: 'emaildata.com',
      });
    expect(response.status).toBe(400);
  });
});
