import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safehtml'
})
export class SafehtmlPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
