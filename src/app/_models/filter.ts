export class Filter {
  public page: number;
  public perPage: number;
  public search: string;

  constructor() {
      this.page = 1;
      this.perPage = 10;
      this.search = "";
  }
}
