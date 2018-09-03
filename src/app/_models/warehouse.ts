import { Address } from  './address'

export class Warehouse {
  public id: string;
  public name: string;
  public importKey: string;
  public address: Address;

  constructor() {
      this.id = null;
      this.name = null;
      this.importKey = null;
      this.address = new Address();
  }
}
