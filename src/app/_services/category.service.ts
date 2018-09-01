import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Category } from '../_models/category'
import { Filter } from '../_models/filter'
import { throwError } from 'rxjs';
import { ErrorService } from './error.service'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient,
              private errorService: ErrorService) { }

  public getCategories(params: any): Observable<any> {
    //assets/mock-service-data/categories.json
    //category
    //let queryString: string = (filter && filter.page && filter.perPage) ? `page=${filter.page}&perPage=${filter.perPage}` : "";
    return this.http.get<any>(`category`, {params : params}).pipe(
      tap(results => console.log(results)),
      catchError(this.errorService.handleError('getCategories', []))
    );
  }

  public searchCategories(params: any) {
    http://149.28.166.130/api/category/search?search=comp
    return this.http.get<any>(`category/search`, {params : params}).pipe(
      tap(results => console.log(results)),
      catchError(this.errorService.handleError('searchCategories', []))
    );
  }

  public getCategory(categoryId: string) {
    return this.http.get<any>(`category/${categoryId}`).pipe(
      tap(results => console.log(results)),
      catchError(this.errorService.handleError('getCategory', []))
    );
  }

  public updateCategory(category){
    return this.http.post(`category`, category).pipe(
      tap(results => console.log(results)),
      catchError(this.errorService.handleError('updateCategory', []))
    );
  }

  public addCategory(category: Category) {
    return this.http.post<any>(`category`, category).pipe(
      tap(results => console.log(results)),
      catchError(this.errorService.handleError('addCategory', []))
    );
  }
}
