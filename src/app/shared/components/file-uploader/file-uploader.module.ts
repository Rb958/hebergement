import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from './file-uploader.component';
import { UploaderInputDirective } from './uploader-input.directive';



@NgModule({
  declarations: [
    FileUploaderComponent,
    UploaderInputDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [FileUploaderComponent, UploaderInputDirective]
})
export class FileUploaderModule { }
