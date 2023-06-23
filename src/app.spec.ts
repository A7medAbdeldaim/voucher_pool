import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './app.module';

describe('App Health Test', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return a successful health check response', async () => {
    const response = await request(app.getHttpServer()).get('/health_check');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });
});
