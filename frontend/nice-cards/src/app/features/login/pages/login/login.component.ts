import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginForm } from '@core/auth/models/auth.interface';
import { AuthService } from '@core/auth/services/auth.service';
import { SingleSignOnOptionsComponent } from '@features/register/components/single-sign-on-options/single-sign-on-options.component';
import { FormInputComponent } from '@shared/components/form-input/form-input.component';
import { ButtonComponent } from "../../../../shared/components/button/button.component";

@Component({
  selector: 'app-login',
  imports: [
    SingleSignOnOptionsComponent,
    FormInputComponent,
    ReactiveFormsModule,
    ButtonComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  handleSubmit(): void {
    this.authService.login(this.loginForm.value as LoginForm).subscribe({
      next: (response) => {
        console.log('Login response: ', response);
      },
      error: (error) => {
        console.log('Login failed: ', error);
      },
    });
  }
}
