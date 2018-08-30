export class Category{

  public IsRoot: boolean;
  public ParentCategoryId: string;
  public Name: string;
  public Description: string;
  public Path: string;
  public SeoKeywords: string;
  public SeoTitles: string;
  public SeoDescription: string;
  public Slug: string;

  constructor() {
      this.IsRoot = false;
      this.ParentCategoryId = "-1";
      this.Name = "";
      this.Description = "";
      this.Path = "";
      this.SeoKeywords = "";
      this.SeoTitles = "";
      this.SeoDescription = "";
      this.Slug = "";
  }
}