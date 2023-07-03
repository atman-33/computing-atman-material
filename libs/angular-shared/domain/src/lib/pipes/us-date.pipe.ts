import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'usDate' })
export class USDatePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any): string {
    const date = new Date(value);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'America/New_York',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}
