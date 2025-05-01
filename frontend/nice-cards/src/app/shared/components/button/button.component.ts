import { Component, input, output } from '@angular/core';

@Component({
  selector: '[nice-button]',
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      (click)="onClick($event)"
      class="w-full rounded-md bg-skin-color-primary/75 p-2 shadow-sm ring-skin-color-ring transition-all duration-300 ease-in-out hover:bg-skin-color-primary focus:ring-2 disabled:bg-skin-color-surface-pop disabled:text-skin-faintest disabled:hover:bg-skin-color-surface-pop"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  type = input('button');
  disabled = input(false);

  clicked = output<MouseEvent>();

  onClick(event: MouseEvent) {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
