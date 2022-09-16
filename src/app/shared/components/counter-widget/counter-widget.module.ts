import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CounterWidgetComponent} from "./counter-widget.component";
import {CustomPipeModule} from "../../custom-pipe/custom-pipe.module";

@NgModule({
  declarations: [
    CounterWidgetComponent
  ],
  imports: [
    CommonModule,
    CustomPipeModule
  ],
  exports: [
    CounterWidgetComponent
  ]
})
export class CounterWidgetModule { }
