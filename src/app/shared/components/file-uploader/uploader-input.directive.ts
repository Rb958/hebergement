import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[uploaderInput]'
})
export class UploaderInputDirective {

  constructor(
    public tpRef: TemplateRef<HTMLInputElement>
  ) { }

}
