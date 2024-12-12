import { INestApplication } from '@nestjs/common';
import { beforeAll, expect } from 'vitest';
import { AppModule } from '@/src/infra/app.module';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { PrismaService } from '@/src/infra/database/prisma/prisma.service';
import { hash } from 'bcryptjs';

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
    const userOnDatabase = await prismaService.user.create({
      data: {
        name: 'Test',
        email: 'test@test.com',
        password: await hash('testtest', 8),
      }
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'test@test.com',
      password: 'testtest',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  });
});
