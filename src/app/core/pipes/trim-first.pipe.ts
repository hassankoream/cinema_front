import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimFirst',
  standalone: true
})
export class TrimFirstPipe implements PipeTransform {

  transform(value: string): unknown {
    return value.slice(0,1);
  }

}
