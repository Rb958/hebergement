import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'ps-version',
  template: `<span class="ps-version">&copy;{{name}} v{{version}}</span>`,
  styleUrls: ['./ps-version.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PsVersionComponent implements OnInit {

  @Input()
  version?: string;
  @Input()
  name?:string;

  constructor() { }

  ngOnInit(): void {
    if (typeof this.version === 'undefined'){
      this.version = '0.0.0';
    }
  }

}
