import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Supplier } from '../_models/supplier'
import { Filter } from '../_models/filter'
import { throwError } from 'rxjs';
import { ErrorService } from './error.service'

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient,
              private errorService: ErrorService) { }

  public getSuppliers(params: any): Observable<any> {
    return this.http.get<any>(`supplier`, {params : params}).pipe(
      tap(results => console.log(results)),
      catchError(this.errorService.handleError('getSuppliers', []))
    );
  }

  public searchSuppliers(params: any) {
    return this.http.get<any>(`supplier/search`, {params : params}).pipe(
      tap(results => console.log(results)),
      catchError(this.errorService.handleError('searchSuppliers', []))
    );
  }
}
