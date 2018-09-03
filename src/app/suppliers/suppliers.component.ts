import { Component, OnInit } from '@angular/core';
import { Filter } from '../_models/filter'
import { Supplier } from '../_models/supplier'
import { SupplierService } from '../_services/supplier.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  supplier: Supplier = new Supplier();
  filter: Filter = new Filter();
  suppliers: Supplier[] = [];
  totalSupplierRecords: number = 0;
  supplierName: string = "";
  rowsPerPageOptions: number[] = [10,15,20];

  public searchSuppliers(query: string): void {
    if(!query) {
      this.filter.search = "";
      this.getSuppliers(this.filter);
      return;
    }
    this.filter.search = query;
    this.supplierService.searchSuppliers(this.filter).subscribe(result => {
      this.totalSupplierRecords = result.totalCount;
      this.suppliers =  result.result;
    })
  }

  constructor(private supplierService: SupplierService,
              private toaster: ToasterService
              ) { }

  ngOnInit() {
    this.filter.perPage = this.rowsPerPageOptions[0];
    this.getSuppliers(this.filter);
  }

  public getSuppliers(filter: Filter): void {
    this.supplierService.getSuppliers(filter).subscribe(result => {
      this.totalSupplierRecords = result.totalCount;
      this.suppliers =  result.result;
    })
  }

  public paginate(event) {
    this.filter.page = event.page + 1;
    this.filter.perPage = event.rows;
    if(!this.filter.search) {
      this.getSuppliers(this.filter);
      return;
    }
    this.searchSuppliers(this.filter.search);
  }

}
