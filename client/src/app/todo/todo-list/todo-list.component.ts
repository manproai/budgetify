import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ITodoItem } from '../models/todo-item.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  constructor(
    private todoService: TodoService,
    private spinnerService: SpinnerService
  ) {}
  todoSubscription!: Subscription;
  todoTasks!: ITodoItem[];

  ngOnInit(): void {
    this.spinnerService.showSpinner();
    this.todoSubscription = this.todoService
      .getTodoTasks()
      .subscribe((value: ITodoItem[]) => {
        this.todoTasks = value;
        this.spinnerService.hideSpinner();
      });
  }
}
