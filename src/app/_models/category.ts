export class Category{
  constructor(public IsRoot: boolean,
              public ParentCategoryId: string,
              public Name: string,
              public Description: string,
              public Path: string,
              public SeoKeywords: string,
              public SeoTitles: string,
              public SeoDescription: string,
              public Slug: string
  ) {}
}