import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
@Pipe({name: 'hoursFormat'})
export class HoursFormatPipe implements PipeTransform {
  transform(num: any): string {
    let exp = parseFloat(num);
    return isNaN(exp) ? '0' : exp.toFixed(2).replace(/(\d)0+$/, '$1');
  }
}
