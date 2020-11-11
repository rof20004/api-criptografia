import { EntityRepository, Repository } from 'typeorm';
import { Purchase } from './entities/purchase.entity';

@EntityRepository(Purchase)
export class PurchaseRepository extends Repository<Purchase> { }
