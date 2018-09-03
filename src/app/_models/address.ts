export class Address {
  public id: string;
  public line1: string;
  public line2: string;
  public suburb: string;
  public state: string;
  public postCode: string;
  public country: string;
  public long: number;
  public lat: number;

  constructor() {
      this.id = null;
      this.line1 = null;
      this.line2 = null;
      this.suburb = null;
      this.state = null;
      this.postCode = null;
      this.country = null;
      this.long = null;
      this.lat = null;
  }
}
