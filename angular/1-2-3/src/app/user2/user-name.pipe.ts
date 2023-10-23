import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalizeFirstWordPipe'
})
export class CapitalizeFirstWordPipe implements PipeTransform {
  transform(name: string): any {
    return name.split(' ').map(n => n.substring(0, 1).toUpperCase() + n.substring(1).toLowerCase()).join(' ');
  }
}