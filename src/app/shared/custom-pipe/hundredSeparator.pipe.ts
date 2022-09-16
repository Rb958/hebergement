import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'hundredSeparator'
})
export class HundredSeparatorPipe implements PipeTransform{
  transform(value: any): string {
    let formated = '';
    const tmp = ''+value;
    for (let i = tmp.length - 1 ; i >= 0; i--) {
      let index = tmp.length - 1 - i;
      formated += tmp[index];
      if (i % 3 == 0){
        formated += ' ';
      }
    }
    return formated;
  }

}
