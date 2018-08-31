import { Component, OnInit } from '@angular/core';
import { Category } from '../../_models/category'
import { CategoryService } from '../../_services/category.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category: Category = new Category();

  constructor(
              private categoryService: CategoryService,
              private toaster: ToasterService
              ) { }

  ngOnInit() {
  }

  public addCategory(form): void {
    if (form.invalid) {
      return;
    }
    //this.findRankingByParentIdAndAdd(Number(this.category.parentCategoryId)+100, Number(this.category.parentCategoryId), this.category.name, this.rankingData);
    this.toaster.pop('success', 'Category added successfully.');
  }

}
