import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Supplier } from '../../_models/supplier'
import { Filter } from '../../_models/filter'
import { SupplierService } from '../../_services/supplier.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {
  category: Supplier = new Supplier();
  filter: Filter =  null;
  action: string = "Add";

  constructor(
              private supplierService: SupplierService,
              private route: ActivatedRoute,
              private router: Router,
              private toaster: ToasterService
              ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('supplierId');
    if(id) {
      this.action = "Update";
    }
  }

}
