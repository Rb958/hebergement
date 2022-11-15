import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsVersionComponent } from './ps-version/ps-version.component';



@NgModule({
  declarations: [
    PsVersionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [PsVersionComponent]
})
export class PsCommonModule { }
