import { Component } from '@angular/core';
import {NotifierService} from '../notifier.service';
import {Notifier} from '../notifier';
import {notifyAnimation} from '../notifier.animation';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss'],
  animations: [notifyAnimation]
})
export class NotifierComponent{

  constructor(public notifierService: NotifierService) { }

  get notifier(): Notifier{
    return this.notifierService.notifier;
  }
}
