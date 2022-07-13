import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ps-infinit-loader',
  templateUrl: './ps-infinite-loader.component.html',
  styleUrls: ['./ps-infinite-loader.component.scss']
})
export class PsInfiniteLoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('Loading...');
  }

}
