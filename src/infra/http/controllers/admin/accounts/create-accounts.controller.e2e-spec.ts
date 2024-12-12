import { INestApplication } from '@nestjs/common';
import { beforeAll, expect } from 'vitest';
import { AppModule } from '@/src/infra/app.module';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { PrismaService } from '@/src/infra/database/prisma/prisma.service';

describe('Create Account (E2E)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prismaService = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /sessions', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'Test',
      email: 'test@test.com',
      password: 'testtest',
    });

    expect(response.statusCode).toBe(201);

    const userOnDatabase = await prismaService.user.findUnique({
      where: {
        email: 'test@test.com',
      },
    });

    expect(userOnDatabase).toBeTruthy;
  });
});
