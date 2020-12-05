import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safehtmlpipe'
})
export class SafehtmlpipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
