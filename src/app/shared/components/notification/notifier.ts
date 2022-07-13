import { Notification } from './notification';

export class Notifier {
  public notifications: Array<Notification> = new Array<Notification>();

  public add(notification: Notification): void{
    this.notifications.unshift(notification);
  }

  public destroy(notifiation: Notification): void{
    this.notifications.splice(this.notifications.indexOf(notifiation),1);
  }
}
