import { CreatePurchaseDto } from './create-purchase.dto';

export class CreatePurchaseDtoBuilder {
  private readonly _createPurchaseDto: CreatePurchaseDto;

  constructor() {
    this._createPurchaseDto = new CreatePurchaseDto();
  }

  withUserDocument (userDocument: string): CreatePurchaseDtoBuilder {
    this._createPurchaseDto.userDocument = userDocument;
    return this;
  }

  withCreditCardToken (creditCardToken: string): CreatePurchaseDtoBuilder {
    this._createPurchaseDto.creditCardToken = creditCardToken;
    return this;
  }

  withValue (value: number): CreatePurchaseDtoBuilder {
    this._createPurchaseDto.value = value;
    return this;
  }

  build (): CreatePurchaseDto {
    return this._createPurchaseDto;
  }
}
