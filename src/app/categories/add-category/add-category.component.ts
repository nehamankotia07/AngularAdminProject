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
  filter: Filter =  new Filter();
  categories: Category[] = [];

  constructor(
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private toaster: ToasterService
              ) { }

  ngOnInit() {
    this.getCategories(this.filter);
  }

  public getCategories(filter: Filter): void {
    this.categoryService.getCategories(filter).subscribe(result => {
      this.categories =  result.result;
    })
  }

  public addCategory(form): void {
    if (form.invalid) {
      return;
    }
    this.categoryService.addCategory(this.category).subscribe(result => {
      this.category =  this.category;
      this.router.navigate(['/categories']);
      this.toaster.pop('success', 'Category added successfully.');
    })
  }

}
