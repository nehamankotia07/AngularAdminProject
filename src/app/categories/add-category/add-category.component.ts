import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Category } from '../../_models/category'
import { Filter } from '../../_models/filter'
import { CategoryService } from '../../_services/category.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category: Category = new Category();
  categories: Category[] = [];
  action: string = "Add";

  constructor(
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private toaster: ToasterService
              ) { }

  ngOnInit() {
    //this.getCategories(null);
    const id = this.route.snapshot.paramMap.get('categoryId');
    if(id) {
      this.action = "Update";
      this.getCategory(id);
    }
  }

  public getCategories(filter: Filter): void {
    this.categoryService.getCategories(filter).subscribe(result => {
      this.categories =  result.result;
    })
  }

  public getCategory(categoryId: string) {
    this.categoryService.getCategory(categoryId).subscribe(result => {
      this.category =  result;
      if(this.category.parentCategoryId !== null && this.category.parentCategoryId !== "00000000-0000-0000-0000-000000000000") {
        this.getParentCategory(this.category.parentCategoryId);
      }
    })
  }

  public getParentCategory(categoryId: string) {
    this.categoryService.getCategory(categoryId).subscribe(result => {
      this.category.parentCategoryId = result;
    })
  }

  public addUpdateCategory(form): void {
    if (form.invalid) {
      return;
    }
    if (this.action == "Update") {
      let cat:any = this.category.parentCategoryId;
      this.category.parentCategoryId = cat.id;
      this.category.slug = ((this.category.slug == "") ? "/" : this.category.slug.replace(/\s/g, "-"));
      this.categoryService.updateCategory(this.category).subscribe(result => {
        this.category =  this.category;
        this.router.navigate(['/categories']);
        this.toaster.pop('success', 'Category updated successfully.');
      });
      return;
    }
    let category = Object.assign({}, this.category);
    let cat:any = category.parentCategoryId;
    category.parentCategoryId = cat.id;
    delete category.id;
    category.slug = ((category.slug == "") ? "/" : category.slug.replace(/\s/g, "-"));
    this.categoryService.addCategory(category).subscribe(result => {
      this.category =  this.category;
      this.router.navigate(['/categories']);
      this.toaster.pop('success', 'Category added successfully.');
    });
  }

  public searchCategories(query: string): void {
    if(!query) {
      this.getCategories(null);
      return;
    }
    this.categoryService.searchCategories({search: query}).subscribe(result => {
      this.categories =  result.result;
    })
  }

  public filterCategories(event) {
    let query = event.query;
    this.searchCategories(query);
  }

}
