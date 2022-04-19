import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ITodoItem } from '../models/todo-item.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  constructor(private todoService: TodoService) {}
  todoSubscription!: Subscription;
  todoTasks!: ITodoItem[];
  controlSubject: Subject<boolean> = new Subject();

  ngOnInit(): void {
    this.todoService
      .getTodoTasks()
      .pipe(takeUntil(this.controlSubject))
      .subscribe((value: ITodoItem[]) => {
        this.todoTasks = value;
      });
  }

  ngOnDestroy(): void {
    this.controlSubject.next(true)
    this.controlSubject.unsubscribe();
  }
}
