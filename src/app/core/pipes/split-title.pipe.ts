import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitTitle',
  standalone: true
})
export class SplitTitlePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    // Split the string by spaces to get the words
    const words = value.split(' ');

    // Group the words in sets of 3 and join them with new lines
    const result = [];
    for (let i = 0; i < words.length; i += 3) {
      result.push(words.slice(i, i + 3).join(' '));
    }

    // Join each set of 3 words with a newline character
    return result.join('\n');
  }

}
