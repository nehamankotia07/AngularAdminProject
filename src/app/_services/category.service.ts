import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Category } from '../_models/category'
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public categories(): Observable<any> {
    return this.http.get<any>(`categories.json`).pipe(
      tap(results => console.log(results)),
      catchError(this.errorService.handleError('categories', []))
    );
  }

  public updateCategory(categoryId, params){
    return this.http.put(`categories/${categoryId}.json`, { category: params }).pipe(
      tap(data => console.log(data))
    );
  }

  public addCategory(params) {
    return this.http.post(`categories.json`, { category: params }).pipe(
      tap(data => console.log(data))
    );
  }
}
