import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: 'ng-template[buttonLoaderIcon]'
})
export class ButtonLoaderIconDirective {

  constructor(
    public tpl: TemplateRef<any>
  ) { }

}
