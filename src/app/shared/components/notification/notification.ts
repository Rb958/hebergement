import { NotificationType } from './notification-type';

export class Notification {
  public message: string;
  public header: string;
  public type: NotificationType;


  constructor(message: string, header: string = 'Notification', type: NotificationType | NotificationType.DEFAULT) {
    this.message = message;
    this.header = header;
    this.type = type;
  }

  get style(): string{
    switch (this.type) {
      case NotificationType.ERROR:
        return 'notif-error';
      case NotificationType.INFO:
        return 'notif-info';
      case NotificationType.SUCCESS:
        return 'notif-success';
      case NotificationType.WARNING:
        return 'notif-warn';
      default:
        return 'default';
    }
  }
}
