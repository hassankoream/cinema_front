import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage',
  standalone: true
})
export class PercentagePipe implements PipeTransform {

  transform(value: number): number {
    if (typeof value !== 'number' || isNaN(value)) {
      return 0;
    }

    // Convert to percentage without decimal places
    return Math.round(value * 10);
  }

}
