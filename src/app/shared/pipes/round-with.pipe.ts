import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundWith',
})
export class RoundWithPipe implements PipeTransform {
  transform(
    value: string | undefined | null,
    start: string,
    end: string,
  ): string | null {
    if (value) {
      return `${start}${value}${end}`;
    }

    return null;
  }
}
