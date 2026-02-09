import { Pipe, PipeTransform } from '@angular/core';
import { format, parseISO } from 'date-fns';

/**
 * SHARED - Pipe
 * Formats dates using date-fns format function
 * Example: '2026-02-09T10:30:00Z' → 'Feb 9, 2026'
 */
@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | Date | null | undefined, formatString: string = 'MMM d, yyyy'): string {
    if (!value) {
      return '';
    }

    try {
      const date = typeof value === 'string' ? parseISO(value) : value;
      return format(date, formatString);
    } catch (error) {
      console.error('DateFormatPipe: Invalid date', value, error);
      return '';
    }
  }
}
