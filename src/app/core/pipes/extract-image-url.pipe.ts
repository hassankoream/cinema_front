import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractImageUrl',
  standalone: true
})
export class ExtractImageUrlPipe implements PipeTransform {
  private readonly baseUrl = 'https://image.tmdb.org/t/p/w300/';

  transform(value: string): string {
    if (!value) return '';

    // Split the input string by the first comma
    const parts = value.split(',');

    
    // Return the image URL with the base URL prefix
    return this.baseUrl + (parts[1] || '');
  }

}
