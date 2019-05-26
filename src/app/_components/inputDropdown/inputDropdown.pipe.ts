import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputDropdownFilter'
})
export class InputDropdownPipe implements PipeTransform {
  transform(dataToSort: string[], columnNameToSort: string, stringToSort: string): any[] {
    const sortedData: string[] = [];

    for (let i = 0; i < dataToSort.length; ++i) {
      if (dataToSort[i][columnNameToSort].search(stringToSort) > -1) {
        sortedData.push(dataToSort[i]);
      }
    }

    return sortedData;
  }
}
