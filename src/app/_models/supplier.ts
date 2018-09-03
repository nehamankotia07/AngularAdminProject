import { Address } from  './address'
import { Warehouse } from './warehouse'

export class Supplier {
  public id: string;
  public name: string;
  public website: string;
  public salesEmail: string;
  public orderEmail: string;
  public accountEmail: string;
  public weightUOM: string;
  public dimensionUOM: string;
  public cubicUOM: string;
  public accountNumber: string;
  public address: Address;
  public paymentTerms: number;
  public warehouses: Warehouse[];

  constructor() {
      this.id = null;
      this.name = "00000000-0000-0000-0000-000000000000";
      this.website = null;
      this.salesEmail = null;
      this.orderEmail = null;
      this.accountEmail = null;
      this.weightUOM = null;
      this.dimensionUOM = null;
      this.cubicUOM = null;
      this.accountNumber = null;
      this.address = new Address();
      this.paymentTerms = null;
      this.warehouses = [];
  }
}
