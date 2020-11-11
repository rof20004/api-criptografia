import { UpdatePurchaseDto } from './update-purchase.dto';

export class UpdatePurchaseDtoBuilder {
  private readonly _updatePurchaseDto: UpdatePurchaseDto;

  constructor() {
    this._updatePurchaseDto = new UpdatePurchaseDto();
  }

  withUserDocument (userDocument: string): UpdatePurchaseDtoBuilder {
    this._updatePurchaseDto.userDocument = userDocument;
    return this;
  }

  withCreditCardToken (creditCardToken: string): UpdatePurchaseDtoBuilder {
    this._updatePurchaseDto.creditCardToken = creditCardToken;
    return this;
  }

  withValue (value: number): UpdatePurchaseDtoBuilder {
    this._updatePurchaseDto.value = value;
    return this;
  }

  build (): UpdatePurchaseDto {
    return this._updatePurchaseDto;
  }
}
