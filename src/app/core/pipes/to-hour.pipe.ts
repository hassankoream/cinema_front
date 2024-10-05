import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toHour',
  standalone: true
})
export class ToHourPipe implements PipeTransform {

  transform(value: number): any {

    if (typeof value !== 'number' || isNaN(value)) {
      return 0;
    }


    if(value < 60){
      return value+'m '
    }


    else if(value > 60){

      let hours = Math.floor(value / 60)
      let mins = value % 60

      return hours+'h '+mins+'m '
      
    }


    
  }

}
