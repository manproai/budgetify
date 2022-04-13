import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
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
  constructor(private todoService: TodoService, private spinnerService: SpinnerService) {}

  onSubmit(formRef: FormGroupDirective) {
    const { value } = this.createForm;
    const newToDo = {
      name: value.name,
      description: value.description,
      createdAt: new Date().toISOString(),
      expireAt: value.expireAt,
      isDone: false,
    };
    this.spinnerService.showSpinner();
    console.log(this.createForm.value);
    this.todoService.createToDo(newToDo).subscribe((result: string) => {
      console.log(result);
      this.createForm.reset();
      formRef.resetForm();
    })
    
  }
}
