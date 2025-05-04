import { Component } from '@angular/core';
import { OutlinedButtonComponent } from '@shared/components/button/outlined-button.component';

@Component({
  selector: 'single-sign-on-options',
  imports: [OutlinedButtonComponent],
  template: `
    <div class="mt-4 flex flex-col gap-6">
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-skin-color-divider"></div>
        </div>
        <div class="relative flex items-center justify-center">
          <span class="bg-skin-color-surface px-2 text-sm text-skin-muted"
            >Or continue with</span
          >
        </div>
      </div>

      <div class="flex gap-6">
        <div
          nice-outlined-button
          class="w-full"
          (click)="handleLoginWithGoogle()"
        >
          <img src="google.svg" alt="facebook" class="size-5" />
          <span class="text-sm font-semibold">Google</span>
        </div>

        <div
          nice-outlined-button
          class="w-full"
          (click)="handleLoginWithFacebook()"
        >
          <img src="facebook.svg" alt="facebook" class="size-6" />
          <span class="text-sm font-semibold">Facebook</span>
        </div>
      </div>
    </div>
  `,
})
export class SingleSignOnOptionsComponent {
  handleLoginWithGoogle() {
    window.location.href = 'http://localhost:5200/api/auth/google';
  }

  handleLoginWithFacebook() {
    window.location.href = 'http://localhost:5200/api/auth/facebook';
  }
}
