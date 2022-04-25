import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { filter, Observable, tap } from 'rxjs';
import { AuthService } from './services/auth.service';
import { SpinnerService } from '../shared/services/spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinnerService.showSpinner();
    if (this.authService.getIsLoggedStatus()) {
      const jwt = localStorage.getItem('idToken');
      const cloned = request.clone({
        headers: request.headers.set('Auth', String(jwt)),
      });
      return next.handle(cloned);
    }
    return next.handle(request).pipe(
      filter((event: HttpEvent<any>) => event instanceof HttpResponse),
      tap(() => this.spinnerService.hideSpinner())
    );
  }
}
