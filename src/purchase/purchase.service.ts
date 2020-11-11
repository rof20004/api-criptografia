import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { PurchaseRepository } from './purchase.repository';
import LocalCrypto from '../utils/crypto';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(PurchaseRepository)
    private readonly purchaseRepository: PurchaseRepository,
  ) { }

  async create (createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const purchase = createPurchaseDto.toEntity();
    await this.purchaseRepository.save(purchase);
    return purchase;
  }

  async findAll (): Promise<Purchase[]> {
    const purchases = await this.purchaseRepository.find();
    return purchases.filter(async (purchase) => await this.decrypt(purchase));
  }

  async findOne (id: number): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findOne({ id });

    if (!purchase) {
      throw new NotFoundException(`Purchase #${id} not found`);
    }

    await this.decrypt(purchase);

    return purchase;
  }

  async update (id: number, updatePurchaseDto: UpdatePurchaseDto) {
    const found = await this.purchaseRepository.findOne({ id });

    if (!found) {
      throw new NotFoundException(`Purchase #${id} not found`);
    }

    const { userDocument, creditCardToken, value } = updatePurchaseDto;
    found.userDocument = userDocument;
    found.creditCardToken = creditCardToken;
    found.value = value;

    await this.purchaseRepository.update(id, found);
  }

  async remove (id: number) {
    const found = await this.purchaseRepository.findOne({ id });

    if (!found) {
      throw new NotFoundException(`Purchase #${id} not found`);
    }

    await this.purchaseRepository.delete({ id });
  }

  private async decrypt (purchase: Purchase): Promise<void> {
    purchase.userDocument = await LocalCrypto.decrypt(purchase.userDocument);
    purchase.creditCardToken = await LocalCrypto.decrypt(
      purchase.creditCardToken,
    );
    return Promise.resolve();
  }
}
