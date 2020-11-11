import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePurchaseDtoBuilder } from './dto/create-purchase-dto.builder';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDtoBuilder } from './dto/update-purchase-dto.builder';
import { PurchaseBuilder } from './entities/purchase.builder';
import { PurchaseRepository } from './purchase.repository';
import { PurchaseService } from './purchase.service';

const mockPurchaseRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
});

describe('PurchaseService', () => {
  let service: PurchaseService;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseService,
        { provide: PurchaseRepository, useFactory: mockPurchaseRepository },
      ],
    }).compile();

    service = module.get<PurchaseService>(PurchaseService);
    repository = module.get<PurchaseRepository>(PurchaseRepository);
  });

  it('create a purchase', async () => {
    const mockResult = {
      id: 1,
      userDocument: '123',
      creditCardToken: '456',
      value: 299.9,
    };
    repository.save.mockResolvedValue(mockResult);

    const payload: CreatePurchaseDto = new CreatePurchaseDtoBuilder()
      .withUserDocument('123')
      .withCreditCardToken('456')
      .withValue(299.9)
      .build();

    await service.create(payload);
    expect(service.create).not.toThrow;
    expect(repository.save).toHaveBeenCalled();
    expect(repository.save).not.toThrow;
  });

  it('return all purchases', async () => {
    const mockPurchases = [
      {
        id: 1,
        userDocument: 'f72d8000fd38557d9563cbba834cd22d:1a4003',
        creditCardToken: '0c975d2e14a2277dafe5614218d88cc7:45ae1c',
        value: 299.9,
      },
      {
        id: 2,
        userDocument: 'f72d8000fd38557d9563cbba834cd22d:1a4003',
        creditCardToken: '0c975d2e14a2277dafe5614218d88cc7:45ae1c',
        value: 299.9,
      },
    ];
    repository.find.mockResolvedValue(mockPurchases);

    const result = await service.findAll();
    expect(service.findAll).not.toThrow;
    expect(repository.find).toHaveBeenCalled();
    expect(repository.find).not.toThrow;
    expect(result).toEqual(mockPurchases);
  });

  it('no purchases found', async () => {
    const mockPurchases = [];
    repository.find.mockResolvedValue(mockPurchases);

    const result = await service.findAll();
    expect(service.findAll).not.toThrow;
    expect(repository.find).toHaveBeenCalled();
    expect(repository.find).not.toThrow;
    expect(result).toEqual(mockPurchases);
  });

  it('get purchase by id', async () => {
    const mockPurchase = {
      id: 1,
      userDocument: 'f72d8000fd38557d9563cbba834cd22d:1a4003',
      creditCardToken: '0c975d2e14a2277dafe5614218d88cc7:45ae1c',
      value: 299.9,
    };
    repository.findOne.mockResolvedValue(mockPurchase);

    const result = await service.findOne(mockPurchase.id);
    expect(service.create).not.toThrow;
    expect(repository.findOne).toHaveBeenCalled();
    expect(repository.findOne).not.toThrow;
    expect(result).toEqual(mockPurchase);
  });

  it('get purchase by id and throw exception when not found', async () => {
    const mockPurchase = {
      id: 1,
      userDocument: '123',
      creditCardToken: '456',
      value: 299.9,
    };

    expect(
      async () => await service.findOne(mockPurchase.id),
    ).rejects.toThrowError(NotFoundException);
    expect(repository.findOne).toHaveBeenCalled();
    expect(repository.findOne).not.toThrow;
  });

  it('update a purchase', async () => {
    const mockPurchase = new PurchaseBuilder()
      .withId(1)
      .withUserDocument('123')
      .withCreditCardToken('456')
      .withValue(299.9)
      .build();

    repository.findOne.mockResolvedValue(mockPurchase);

    const id = 1;

    const mockUpdatePurchaseDto = new UpdatePurchaseDtoBuilder()
      .withUserDocument('123')
      .withCreditCardToken('456')
      .withValue(300)
      .build();

    await service.update(id, mockUpdatePurchaseDto);
    expect(service.update).not.toThrow;
    expect(repository.update).toHaveBeenCalledWith(id, mockPurchase);
    expect(repository.update).not.toThrow;
  });

  it('update a purchase and throw exception when not found', async () => {
    repository.findOne.mockResolvedValue(null);

    const id = 1;

    const mockUpdatePurchaseDto = new UpdatePurchaseDtoBuilder()
      .withUserDocument('123')
      .withCreditCardToken('456')
      .withValue(299.9)
      .build();

    expect(
      async () => await service.update(id, mockUpdatePurchaseDto),
    ).rejects.toThrowError(NotFoundException);
  });

  it('delete a purchase', async () => {
    repository.findOne.mockResolvedValue({ id: 1 });

    const id = 1;
    await service.remove(id);
    expect(repository.delete).toHaveBeenCalled();
    expect(repository.delete).not.toThrow;
  });

  it('delete a purchase and throw exception when not found', async () => {
    repository.findOne.mockResolvedValue(null);

    const id = 1;

    expect(async () => await service.remove(id)).rejects.toThrowError(
      NotFoundException,
    );
  });
});
