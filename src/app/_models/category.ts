export class Category{

  public id: string;
  public parentCategoryId: string;
  public name: string;
  public description: string;
  public path: string;
  public seoKeywords: string;
  public seoTitle: string;
  public seoDescription: string;
  public slug: string;

  constructor() {
      this.id = null;
      this.parentCategoryId = "00000000-0000-0000-0000-000000000000";
      this.name = null;
      this.description = null;
      this.path = null;
      this.seoKeywords = null;
      this.seoTitle = null;
      this.seoDescription = null;
      this.slug = null;
  }
}