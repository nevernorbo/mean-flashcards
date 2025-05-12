import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { NotificationType, Notification } from '../models/notification';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationSubject = new Subject<Notification>();

  get notification$(): Observable<Notification> {
    return this.notificationSubject.asObservable();
  }

  show(message: string, type: NotificationType) {
    this.notificationSubject.next({ message, type } as Notification);
  }
}
