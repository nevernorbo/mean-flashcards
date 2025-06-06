import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterForm } from '@core/auth/models/auth.interface';
import { AuthService } from '@core/auth/services/auth.service';
import { SingleSignOnOptionsComponent } from '@features/register/components/single-sign-on-options/single-sign-on-options.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { FormInputComponent } from '@shared/components/form-input/form-input.component';

@Component({
  selector: 'app-register',
  imports: [
    FormInputComponent,
    SingleSignOnOptionsComponent,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordAgain: ['', Validators.required],
    });
  }

  handleSubmit(): void {
    this.authService.register(this.registerForm.value as RegisterForm);
  }
}
