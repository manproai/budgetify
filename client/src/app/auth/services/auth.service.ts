import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subscriber, tap, throwError } from 'rxjs';
import { IAuth } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<IAuth> {
    return this.http
      .post<IAuth>('http://localhost:3000/users/login', {
        email,
        password,
      })
      .pipe(
        tap((res: IAuth) => this.setSesstion(res)),
        catchError((err) => throwError(() => '401'))
      );
  }

  getIsLoggedStatus(): boolean {
    const expiresIn = localStorage.getItem('expiresIn');
    if (expiresIn) {
      return Date.now() < Number(expiresIn);
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('idToken');
  }

  private setSesstion(res: IAuth): void {
    const expiresIn = Date.now() + Number(res.expiresIn);
    localStorage.setItem('idToken', res.token);
    localStorage.setItem('expiresIn', String(expiresIn));
  }
}
