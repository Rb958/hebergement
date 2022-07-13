import {Injectable} from '@angular/core';
import {Notifier} from './notifier';
import {NotificationType} from './notification-type';
import {Notification} from './notification';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  public notifier: Notifier = new Notifier();

  notify(
    message: string,
    title: string = 'Notification',
    notiticationType: NotificationType = NotificationType.SUCCESS,
    duration: number = 8000
  ): void {
    const notification = new Notification(message, title, notiticationType);

    const dismiss = () => {
      new Promise<void>((resolve) => setTimeout(resolve, duration)).then(() => {
        this.notifier.destroy(notification);
      });
    };
    this.notifier.add(notification);
    dismiss();
  }
}
