import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { ToasterService } from 'angular2-toaster';

@Injectable({
  providedIn: 'root'
})
// TODO: Change to Action Service to centralize toaster message across the application,
// Helps in replacing the library, in case :-|
export class ErrorService {

  constructor(private http: HttpClient, private toaster: ToasterService) { }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error)
      this.toaster.pop('error', `${result}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public showError<T>(result?: T): void {
    this.toaster.pop('error', `${result}`);
  }

  public showSuccess<T>(result?: T) {
    this.toaster.pop('success', `${result}`);
  }

  public showInfo<T>(result?: T) {
    this.toaster.pop('info', `${result}`);
  }

  public clearAll(): void{
    this.toaster.clear()
  }

}
