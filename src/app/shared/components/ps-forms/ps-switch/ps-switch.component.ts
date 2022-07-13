import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'ps-switch',
  templateUrl: './ps-switch.component.html',
  styleUrls: ['./ps-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PsSwitchComponent implements OnInit {

  @Input()
  htmlId: string = 'switch_' + 1;

  constructor() { }

  ngOnInit(): void {
  }

}
