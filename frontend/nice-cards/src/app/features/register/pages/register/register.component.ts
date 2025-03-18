import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormInputComponent } from '../../../../shared/components/form-input/form-input.component';
import { SingleSignOnOptionsComponent } from '../../components/single-sign-on-options/single-sign-on-options.component';

@Component({
  selector: 'app-register',
  imports: [
    FormInputComponent,
    SingleSignOnOptionsComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordAgain: ['', Validators.required],
    });
  }

  handleSubmit(): void {
    console.log(this.registerForm.value);
  }
}
