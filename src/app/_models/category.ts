export class Category{

  public isRoot: boolean;
  public parentCategoryId: string;
  public name: string;
  public description: string;
  public path: string;
  public seoKeywords: string;
  public seoTitle: string;
  public seoDescription: string;
  public slug: string;

  constructor() {
      this.isRoot = false;
      this.parentCategoryId = "-1";
      this.name = "";
      this.description = "";
      this.path = "";
      this.seoKeywords = "";
      this.seoTitle = "";
      this.seoDescription = "";
      this.slug = "";
  }
}