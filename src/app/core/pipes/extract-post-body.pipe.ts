import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractPostBody',
  standalone: true
})
export class ExtractPostBodyPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    // Split the input string by the first comma
    const parts = value.split(',');

    // Join all remaining parts after the second comma to handle commas within the body
    return parts.slice(2).join(',') || '';
  }

}
