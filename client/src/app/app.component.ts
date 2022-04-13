import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';
  isSpinnerVisible: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.spinnerService.getIsSpinnerVisible$().subscribe((value: boolean) => {
      this.isSpinnerVisible = value;
    });
  }

  get isLogged(): boolean {
    return this.authService.isLogged();
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
