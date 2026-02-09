import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number | null | undefined, showSign = false): string {
    if (value === null || value === undefined) {
      return '$0.00';
    }

    const sign = showSign && value > 0 ? '+' : '';
    const formatted = Math.abs(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return `${sign}$${formatted}`;
  }
}
