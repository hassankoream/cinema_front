import { NgStyle, NgFor, NgClass, SlicePipe, NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IShow } from '../../core/interfaces/ishow';
import { PercentagePipe } from '../../core/pipes/percentage.pipe';
import { ProgressCircleComponent } from '../progress-circle/progress-circle.component';
import { Icredit } from '../../core/interfaces/icredit';

@Component({
  selector: 'app-cast-slider',
  standalone: true,
  imports: [NgStyle, NgFor, NgClass, ProgressCircleComponent, PercentagePipe, RouterLink, SlicePipe, NgIf],
  templateUrl: './cast-slider.component.html',
  styleUrl: './cast-slider.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CastSliderComponent {
  @Input() showCredits!: Icredit // Input for the shows data
   @Input() slidesNum!: number // Input for the shows data
   mainImageUrl:string = 'https://image.tmdb.org/t/p/w500'

}
