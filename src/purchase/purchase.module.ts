import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseRepository } from './purchase.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseRepository])],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule { }
