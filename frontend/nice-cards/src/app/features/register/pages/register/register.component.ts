import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterForm } from '@core/auth/models/auth.interface';
import { AuthService } from '@core/auth/services/auth.service';
import { SingleSignOnOptionsComponent } from '@features/register/components/single-sign-on-options/single-sign-on-options.component';
import { FormInputComponent } from '@shared/components/form-input/form-input.component';

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

  constructor(
    private router: Router,
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
    this.authService
      .register(this.registerForm.value as RegisterForm)
      .subscribe({
        next: (response) => {
          console.log('Register response: ', response);
          this.router.navigateByUrl('/login');
        },
        error: (error) => {
          console.log('Register failed: ', error);
        },
      });
  }
}
