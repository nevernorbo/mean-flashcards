import { Component, OnInit, signal } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { NotificationService } from '../services/notification.service';
import { NotificationType } from '../models/notification';

@Component({
  selector: 'app-notification',
  template: `
    @if (visible()) {
      @switch (type()) {
        @case ('success') {
          <div
            @slideDownUp
            class="fixed left-1/2 top-20 z-50 flex w-fit min-w-40 -translate-x-1/2 select-none flex-wrap items-center justify-center rounded-md bg-green-500 px-4 py-2 text-center text-white shadow-md"
          >
            {{ message() }}
          </div>
        }
        @case ('error') {
          <div
            @slideDownUp
            class="fixed left-1/2 top-20 z-50 flex w-fit min-w-40 -translate-x-1/2 select-none flex-wrap items-center justify-center rounded-md bg-red-500 px-4 py-2 text-center text-white shadow-md"
          >
            {{ message() }}
          </div>
        }
        @default {
          <div
            @slideDownUp
            class="fixed left-1/2 top-20 z-50 flex w-fit min-w-40 -translate-x-1/2 select-none flex-wrap items-center justify-center rounded-md bg-skin-color-surface-pop px-4 py-2 text-center text-white shadow-md ring-1 ring-skin-color-primary"
          >
            {{ message() }}
          </div>
        }
      }
    }
  `,
  animations: [
    trigger('slideDownUp', [
      transition(':enter', [
        style({ transform: 'translate(-50%,-100%)', opacity: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'translate(-50%, 0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ transform: 'translate(-50%,-100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class NotificationComponent implements OnInit {
  message = signal<string>('');
  type = signal<NotificationType>('error');

  visible = signal<boolean>(false);

  private timeoutId: any;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notification$.subscribe((notification) => {
      this.message.set(notification.message);
      this.type.set(notification.type);

      this.visible.set(true);
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => this.visible.set(false), 3000);
    });
  }
}
