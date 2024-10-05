import { NgStyle } from '@angular/common';
import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-progress-circle',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './progress-circle.component.html',
  styleUrl: './progress-circle.component.css'
})
export class ProgressCircleComponent {
  @Input() progress!:number;
  @Input() paddingValue!:number;
  @Input() fontSizeValue!:number;
// Function to get the progress bar color based on the percentage
getProgressColor(): string {
  if (this.progress > 80) {
    return 'green';
  } else if (this.progress >= 50) {
    return 'yellow';
  } else {
    return 'red';
  }
}
 

 

}
