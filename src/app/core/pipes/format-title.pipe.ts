import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTitle',
  standalone: true
})
export class FormatTitlePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    
    // Replace underscores with spaces and capitalize each word
    return value
      .replace(/_/g, ' ')               // Replace underscores with spaces
      .split(' ')                       // Split by spaces
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' ');                       // Join back into a string
  }

}
