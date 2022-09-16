import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonLoaderComponent } from './button-loader.component';
import { ButtonLoaderIconDirective } from './button-loader-icon.directive';



@NgModule({
  declarations: [
    ButtonLoaderComponent,
    ButtonLoaderIconDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonLoaderComponent,
    ButtonLoaderIconDirective
  ]
})
export class ButtonLoaderModule { }
