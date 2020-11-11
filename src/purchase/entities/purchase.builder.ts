import { Purchase } from './purchase.entity';

export class PurchaseBuilder {
  private readonly _purchase: Purchase;

  constructor() {
    this._purchase = new Purchase();
  }

  withId (id: number): PurchaseBuilder {
    this._purchase.id = id;
    return this;
  }

  withUserDocument (userDocument: string): PurchaseBuilder {
    this._purchase.userDocument = userDocument;
    return this;
  }

  withCreditCardToken (creditCardToken: string): PurchaseBuilder {
    this._purchase.creditCardToken = creditCardToken;
    return this;
  }

  withValue (value: number): PurchaseBuilder {
    this._purchase.value = value;
    return this;
  }

  build (): Purchase {
    return this._purchase;
  }
}
