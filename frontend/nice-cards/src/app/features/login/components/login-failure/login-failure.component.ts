import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, LogIn } from 'lucide-angular';

@Component({
  selector: 'app-login-failure',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './login-failure.component.html',
  styles: `
    :host {
      margin: auto;
    }
  `,
})
export class LoginFailureComponent {
  readonly Login = LogIn;
}
