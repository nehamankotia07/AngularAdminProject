import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Category } from '../_models/category'
import { throwError } from 'rxjs';
import { ErrorService } from './error.service'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient,
              private errorService: ErrorService) { }

  public getCategories(): Observable<any> {
    return this.http.get<any>(`assets/mock-service-data/categories.json`).pipe(
      tap(results => console.log(results)),
      catchError(this.errorService.handleError('getCategories', []))
    );
  }

  public updateCategory(categoryId, params){
    return this.http.put(`categories/${categoryId}.json`, { category: params }).pipe(
      tap(data => console.log(data))
    );
  }

  public addCategory(params) {
    /*return this.http.post(`categories.json`, { category: params }).pipe(
      tap(data => console.log(data))
    );*/
    return this.http.get<any>(`assets/mock-service-data/categories.json`).pipe(
      tap(results => console.log(results)),
      catchError(this.errorService.handleError('getCategories', []))
    );
  }
}