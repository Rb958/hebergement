import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'counter-widget',
  templateUrl: './counter-widget.component.html',
  styleUrls: ['./counter-widget.component.scss']
})
export class CounterWidgetComponent implements OnInit {
  @Input('value')
  value: any;
  @Input('title')
  title: any;
  @Input('unit')
  unit: string = '';
  @Input('isAmount')
  isAmount = false;

  constructor() { }

  ngOnInit(): void {
  }

}
