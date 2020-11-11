import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import * as request from 'supertest';

const mockPurchaseService = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
});

describe('PurchaseController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseController],
      providers: [
        {
          provide: PurchaseService,
          useFactory: mockPurchaseService,
        },
      ],
    }).compile();

    app = module.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );

    await app.init();
  });

  it('expects to return 201 for create purchase', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/purchases')
      .send({ userDocument: '123', creditCardToken: '456', value: 299.9 })
      .expect(201);
  });

  it('expects to return 400 for create purchase when payload is not valid', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/purchases')
      .send({ userDocument: '123', creditCardToken: '', value: 299.9 })
      .expect(400);
  });

  it('expects to return 200 for find all purchases', async () => {
    await request(app.getHttpServer()).get('/api/v1/purchases').expect(200);
  });
});
