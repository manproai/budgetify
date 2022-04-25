import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe, Subject, Subscriber } from 'rxjs';
import { ITodoItem } from '../models/todo-item.model';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoTasks: ITodoItem[] = [
    {
      name: 'Shopping',
      description: 'this is description',
      createdAt: new Date().toISOString(),
      expireAt: new Date(2022, 4, 9).toISOString(),
      isDone: false,
    },
    {
      name: 'Cleaning',
      description: 'this is description',
      createdAt: new Date().toISOString(),
      expireAt: new Date(2022, 4, 9).toISOString(),
      isDone: true,
    },
    {
      name: 'Repairing',
      description: 'this is description',
      createdAt: new Date().toISOString(),
      expireAt: new Date(2022, 4, 9).toISOString(),
      isDone: false,
    },
    {
      name: 'Smth',
      description: 'this is description',
      createdAt: new Date().toISOString(),
      expireAt: new Date(2022, 4, 9).toISOString(),
      isDone: false,
    },
    {
      name: 'Buy milk',
      description: 'this is description',
      createdAt: new Date().toISOString(),
      expireAt: new Date(2022, 4, 9).toISOString(),
      isDone: true,
    },
    {
      name: 'Finish hw',
      description: 'this is description',
      createdAt: new Date().toISOString(),
      expireAt: new Date(2022, 4, 9).toISOString(),
      isDone: true,
    },
  ];
  constructor() {}

  todoTasks$: Subject<ITodoItem[]> = new BehaviorSubject([...this.todoTasks]);

  getTodoTasks(): Observable<ITodoItem[]> {
    return this.todoTasks$.asObservable().pipe(delay(1500));
  }

  createToDo(newToDo: ITodoItem): Observable<any> {
    return new Observable((subscriber: Subscriber<string>) => {
      subscriber.next('Success');
    }).pipe(
      delay(1000),
      tap(() => {
        this.todoTasks.push(newToDo);
        this.todoTasks$.next([...this.todoTasks]);
      })
    );
  }

  searchTodo(str: string): void {
    const filteredTasks = this.todoTasks.filter((todoItem: ITodoItem) =>
      todoItem.name.includes(str)
    );
    this.todoTasks$.next(filteredTasks);
  }
}
