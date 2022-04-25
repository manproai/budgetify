import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { SpinnerService } from './shared/services/spinner.service';
import { TodoService } from './todo/services/todo.service';

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
    private spinnerService: SpinnerService,
    private todoService: TodoService,
  ) {}

  ngOnInit(): void {
    this.spinnerService.getIsSpinnerVisible$().subscribe((value: boolean) => {
      this.isSpinnerVisible = value;
    });
  }

  get isLogged(): boolean {
    return this.authService.getIsLoggedStatus ();
  }
  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  healthCheck(): void {
    this.todoService.createToDo(
      {
        name: 'Test',
        description: 'this is test description',
        createdAt: new Date().toISOString(),
        expireAt: new Date(2022, 4, 9).toISOString(),
        isDone: false,
      }
    ).subscribe((res) => console.log(res)
    );
  }
}
