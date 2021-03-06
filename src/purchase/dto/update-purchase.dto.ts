import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { PurchaseBuilder } from '../entities/purchase.builder';
import { Purchase } from '../entities/purchase.entity';

export class UpdatePurchaseDto {
  @IsNotEmpty()
  @ApiProperty()
  userDocument: string;

  @IsNotEmpty()
  @ApiProperty()
  creditCardToken: string;

  @IsNumber()
  @ApiProperty()
  value: number;

  toEntity (): Purchase {
    return new PurchaseBuilder()
      .withUserDocument(this.userDocument)
      .withCreditCardToken(this.creditCardToken)
      .withValue(this.value)
      .build();
  }
}
