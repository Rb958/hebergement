import {Component, OnInit, ChangeDetectionStrategy, EventEmitter} from '@angular/core';
import {SearchItem} from "./search-item";

@Component({
  selector: 'ps-search',
  templateUrl: './ps-search.component.html',
  styleUrls: ['./ps-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PsSearchComponent implements OnInit {

  private search: EventEmitter<SearchItem> = new EventEmitter<SearchItem>()

  constructor() { }

  ngOnInit(): void {
  }

}
