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
  rowsPerPageOptions: number[] = [10,15,20];

  public searchCategories(query: string): void {
    if(!query) {
      this.filter.search = "";
      this.getCategories(this.filter);
      return;
    }
    this.filter.search = query;
    this.categoryService.searchCategories(this.filter).subscribe(result => {
      this.totalCategoryRecords = result.totalCount;
      this.categories =  result.result;
    })
  }

  constructor(private categoryService: CategoryService,
              private toaster: ToasterService
              ) { }

  ngOnInit() {
    this.filter.perPage = this.rowsPerPageOptions[0];
    this.getCategories(this.filter);
  }

  public getCategories(filter: Filter): void {
    this.categoryService.getCategories(filter).subscribe(result => {
      this.totalCategoryRecords = result.totalCount;
      this.categories =  result.result;
    })
  }

  public paginate(event) {
    this.filter.page = event.page + 1;
    this.filter.perPage = event.rows;
    if(!this.filter.search) {
      this.getCategories(this.filter);
      return;
    }
    this.searchCategories(this.filter.search);
  }

}
