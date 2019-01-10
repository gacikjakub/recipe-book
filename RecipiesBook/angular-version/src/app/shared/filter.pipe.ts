import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(values: any[], propName: string, filter: string): string[] {
    if (values.length === 0 || filter === '') {
      return values;
    }
    filter = filter.toLocaleLowerCase();
    return values.filter(value => value[propName].toLocaleLowerCase().indexOf(filter) !== -1 );
  }
}
