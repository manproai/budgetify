import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post('http://localhost:3000/users/login', {
        email,
        password,
      })
      .pipe(tap((res) => this.setSesstion(res)));
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

  private setSesstion(res: any) {
    const expiresIn = Date.now() + Number(res.expiresIn);
    localStorage.setItem('idToken', res.token);
    localStorage.setItem('expiresIn', String(expiresIn));
  }
}
