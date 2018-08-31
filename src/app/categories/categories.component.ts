import { Component, OnInit } from '@angular/core';
import { RankingService } from '../ranking.service';
import { RankData } from '../rankdata'
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
  categories: Category[] = [];

  public searchCategory(query: string): void {
    this.categoryService.getCategories().subscribe(result => {
      let categoryResult = [];
      categoryResult = result.result.filter(
                                      (category:Category) => category.path.indexOf(query) !== -1);
      this.categories = categoryResult;
    })
  }

  constructor(private rankingService: RankingService,
              private categoryService: CategoryService,
              private toaster: ToasterService
              ) { }

  ngOnInit() {
    this.getCategories();
  }

  public getCategories(): void {
    this.categoryService.getCategories().subscribe(result => {
      this.categories =  result.result;
    })
  }

}
