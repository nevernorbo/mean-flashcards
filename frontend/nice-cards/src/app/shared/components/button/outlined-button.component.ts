import { Component, input, output } from '@angular/core';

@Component({
  selector: '[nice-outlined-button]',
  imports: [],
  template: `
      <button
        [type]="type()"
        [disabled]="disabled()"
        (click)="onClick($event)"
        class="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md border border-skin-color-faintest p-2 shadow-sm hover:bg-skin-color-surface-pop"
      >
        <ng-content></ng-content>
      </button>
  `,
})
export class OutlinedButtonComponent {
  type = input('button');
  disabled = input(false);

  clicked = output<MouseEvent>();

  onClick(event: MouseEvent) {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
