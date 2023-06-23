import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

describe('Test Prisma Service', () => {
  let provider: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [PrismaService, ConfigService],
    }).compile();

    provider = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

describe('Test Prisma Client Connection', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
  it('Should be able to connect to the database', async () => {
    await expect(prisma.$connect()).resolves.not.toThrow();
  });
});
