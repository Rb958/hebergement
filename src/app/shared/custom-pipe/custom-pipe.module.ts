import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PadEndPipe, PadStartPipe} from "./pad.pipe";
import {HundredSeparatorPipe} from "./hundredSeparator.pipe";

@NgModule({
  declarations: [
    PadEndPipe,
    PadStartPipe,
    HundredSeparatorPipe
  ],
  exports: [
    PadEndPipe,
    PadStartPipe,
    HundredSeparatorPipe
  ],
  imports: [
    CommonModule
  ]
})
export class CustomPipeModule { }
