import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { CookieService } from '../_services/cookie.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        // this.authenticationService.logout();
        this.cookieService.clearCookies();
        // this.state.go('app.welcome.home')
      }

      return throwError(err);
    }))
  }
}
