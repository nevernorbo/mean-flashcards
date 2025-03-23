import { Component } from '@angular/core';

@Component({
  selector: 'single-sign-on-options',
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
        <button
          (click)="handleLoginWithGoogle()"
          class="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md border border-skin-color-faintest p-2 shadow-sm hover:bg-skin-color-surface-pop"
        >
          <img src="google.svg" alt="facebook" class="size-5" />
          <span class="text-sm font-semibold">Google</span>
        </button>
        <button
          (click)="handleLoginWithFacebook()"
          class="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md border border-skin-color-faintest p-2 shadow-sm hover:bg-skin-color-surface-pop"
        >
          <img src="facebook.svg" alt="facebook" class="size-6" />

          <span class="text-sm font-semibold">Facebook</span>
        </button>
      </div>

      <div class="self-center text-skin-muted">
        Already have an account?
        <a
          class="text-skin-base underline decoration-orange-500 decoration-2"
          href="login"
          >Login</a
        >
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
