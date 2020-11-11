import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';

@Controller('/api')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) { }

  @Post('/v1/purchases')
  async create (@Body() createPurchaseDto: CreatePurchaseDto) {
    return await this.purchaseService.create(createPurchaseDto);
  }

  @Get('/v1/purchases')
  async findAll (): Promise<Purchase[]> {
    return await this.purchaseService.findAll();
  }

  @Get('/v1/purchases/:id')
  findOne (@Param('id') id: string) {
    return this.purchaseService.findOne(+id);
  }

  @Put('/v1/purchases/:id')
  update (
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    return this.purchaseService.update(+id, updatePurchaseDto);
  }

  @Delete('/v1/purchases/:id')
  remove (@Param('id') id: string) {
    return this.purchaseService.remove(+id);
  }
}
