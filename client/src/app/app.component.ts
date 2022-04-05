import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';
  constructor(private authService: AuthService, private router: Router){}

  get isLogged(): boolean {
    return this.authService.isLogged();
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }


}
