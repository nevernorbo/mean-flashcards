import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { OutlinedButtonComponent } from '@shared/components/button/outlined-button.component';
import { LucideAngularModule, Check, X } from 'lucide-angular';

@Component({
  selector: 'confirm-popup',
  imports: [LucideAngularModule, ButtonComponent, OutlinedButtonComponent],
  template: `
    <div
      style="height: calc(100% - 3.6rem)"
      class="absolute inset-0 mt-12 flex grow animate-slideDown justify-center self-start backdrop-blur-md"
    >
      <div
        class="m-12 flex h-fit flex-col gap-4 rounded-md border border-skin-color-primary bg-skin-color-surface p-5 md:max-w-72"
      >
        <div class="my-2 flex items-center justify-center">
          <h2 class="text-wrap text-center text-2xl">
            {{ confirmationQuestion() }}
          </h2>
        </div>

        <div class="flex justify-evenly gap-2">
          <button nice-button (click)="confirm()">
            <lucide-icon [img]="Check" />
            <div>{{ confirmText() }}</div>
          </button>

          <button nice-outlined-button (click)="close()">
            <lucide-icon [img]="X" />
            <div>{{ closeText() }}</div>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ConfirmPopupComponent {
  readonly Check = Check;
  readonly X = X;

  confirmationQuestion = input<string>('');
  confirmText = input<string>('');
  closeText = input<string>('');

  popupConfirmed = output();
  popupClosed = output();

  confirm() {
    this.popupConfirmed.emit();
  }

  close() {
    this.popupClosed.emit();
  }
}
