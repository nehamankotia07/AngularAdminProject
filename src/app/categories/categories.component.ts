import { Component, OnInit } from '@angular/core';
import { Filter } from '../_models/filter'
import { Category } from '../_models/category'
import { CategoryService } from '../_services/category.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  category: Category = new Category();
  filter: Filter = new Filter();
  categories: Category[] = [];
  totalCategoryRecords: number = 0;
  categoryName: string = "";

  public searchCategory(query: string): void {
    this.categoryService.getCategories(this.filter).subscribe(result => {
      let categoryResult = [];
      categoryResult = result.result.filter(
                                      (category:Category) => category.path.indexOf(query) !== -1);
      this.categories = categoryResult;
    })
  }

  constructor(private categoryService: CategoryService,
              private toaster: ToasterService
              ) { }

  ngOnInit() {
    this.getCategories(this.filter);
  }

  public getCategories(filter: Filter): void {
    this.categoryService.getCategories(filter).subscribe(result => {
      this.totalCategoryRecords = result.totalCount;
      this.categories =  result.result;
    })
  }

  public paginate(event) {
    console.log(event);
    this.filter.page = event.page + 1;
    this.filter.perPage = event.rows;
    this.getCategories(this.filter);
  }

}
