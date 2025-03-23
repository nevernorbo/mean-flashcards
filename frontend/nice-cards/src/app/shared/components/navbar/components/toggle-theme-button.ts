import { Component, effect, signal } from '@angular/core';
import { LucideAngularModule, MoonStar, Sun } from 'lucide-angular';

@Component({
  selector: 'toggle-theme-button',
  imports: [LucideAngularModule],
  template: `
    <button
      class="m-2 flex w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-skin-color-surface-pop p-2 text-skin-muted ring-skin-color-primary hover:text-skin-base focus:ring-2"
      (click)="toggleTheme()"
    >
      @if (useDarkTheme()) {
        <lucide-icon [img]="MoonStar"></lucide-icon>
      } @else {
        <lucide-icon [img]="Sun"></lucide-icon>
      }
    </button>
  `,
  styles: `
    :host {
      margin-left: auto;
      display: flex;
    }
  `,
})
export class ToggleThemeButtonComponent {
  readonly MoonStar = MoonStar;
  readonly Sun = Sun;

  useDarkTheme = signal(false);

  constructor() {
    effect(() => {
      this.setTheme();
    });
  }

  setTheme() {
    this.useDarkTheme.set(
      localStorage['theme'] === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
    );

    document.documentElement.classList.toggle('dark', this.useDarkTheme());
    window.localStorage.setItem(
      'theme',
      this.useDarkTheme() ? 'dark' : 'light'
    );
  }

  toggleTheme() {
    this.useDarkTheme.set(!this.useDarkTheme());
    document.documentElement.classList.toggle('dark', this.useDarkTheme());
    window.localStorage.setItem(
      'theme',
      this.useDarkTheme() ? 'dark' : 'light'
    );
  }
}
