import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-search-todo',
  templateUrl: './search-todo.component.html',
  styleUrls: ['./search-todo.component.scss'],
})
export class SearchTodoComponent implements AfterViewInit {
  @ViewChild('search') search!: ElementRef;
  constructor(private todoService: TodoService) {}

  ngAfterViewInit(): void {
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(debounceTime(500))
      .subscribe((event: any) => {
        this.todoService.searchTodo(event.target.value);
        console.log(event.target.value);
      });
  }
}
