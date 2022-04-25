import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent {
  createForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    expireAt: new FormControl('', [Validators.required]),
  });
  constructor(private todoService: TodoService) {}

  onSubmit(formRef: FormGroupDirective): void {
    const { value } = this.createForm;
    const newToDo = {
      name: value.name,
      description: value.description,
      createdAt: new Date().toISOString(),
      expireAt: value.expireAt,
      isDone: false,
    };

    this.todoService.createToDo(newToDo).subscribe((result: string) => {
      this.createForm.reset();
      formRef.resetForm();
    });
  }
}
