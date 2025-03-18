import { Component } from '@angular/core';
import { SingleSignOnOptionsComponent } from '../../../register/components/single-sign-on-options/single-sign-on-options.component';
import { FormInputComponent } from '../../../../shared/components/form-input/form-input.component';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    SingleSignOnOptionsComponent,
    FormInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  handleSubmit(): void {
    console.log(this.loginForm.value);
  }
}
