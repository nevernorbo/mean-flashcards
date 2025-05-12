export interface Notification {
  message: string;
  type: NotificationType;
}

export type NotificationType = 'normal' | 'success' | 'error';
