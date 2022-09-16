import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padStart'
})
export class PadStartPipe implements PipeTransform {

  transform(value: string, maxLength: number = 2, fill: string = '0'): unknown {
    return value.padStart(maxLength, fill);
  }
}

@Pipe({
  name: 'padEnd'
})
export class PadEndPipe implements PipeTransform{
  transform(value: any, ...args: any[]): any {
  }

}
