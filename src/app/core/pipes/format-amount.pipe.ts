import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAmount',
  standalone: true
})
export class FormatAmountPipe implements PipeTransform {

  transform(value: number, currencyCode: string = 'USD'): string {
    if (value === null || value === undefined) {
      return '';
    }

    let formattedValue: string;

    if (value >= 1_000_000_000) {
      formattedValue = (value / 1_000_000_000).toFixed(2) + 'B'; // Billions
    } else if (value >= 1_000_000) {
      formattedValue = (value / 1_000_000).toFixed(2) + 'M'; // Millions
    } else if (value >= 1_000) {
      formattedValue = (value / 1_000).toFixed(2) + 'K'; // Thousands
    } else {
      formattedValue = value.toFixed(2); // Small numbers
    }

    // Optionally, add the currency symbol
    let currencySymbol = '';
    switch (currencyCode) {
      case 'USD': currencySymbol = '$'; break;
      case 'EUR': currencySymbol = '€'; break;
      case 'EGP': currencySymbol = '£'; break;
      // Add more currencies as needed
      default: currencySymbol = currencyCode;
    }

    return currencySymbol + formattedValue;
  }

}
