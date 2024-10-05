import { DatePipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, inject, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { IShow } from '../../core/interfaces/ishow';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { ProgressCircleComponent } from "../progress-circle/progress-circle.component";
import { PercentagePipe } from '../../core/pipes/percentage.pipe';
import { RouterLink } from '@angular/router';
// register Swiper custom elements
register();

@Component({
  selector: 'app-movie-slider',
  standalone: true,
  imports: [NgStyle, NgFor, NgClass, ProgressCircleComponent, PercentagePipe, RouterLink, NgIf, DatePipe],
  templateUrl: './movie-slider.component.html',
  styleUrl: './movie-slider.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovieSliderComponent {
   // Movie data (this can be dynamically fetched from an API)
   private readonly _MoviesService = inject(MoviesService);



   @Input() shows: IShow[] = []; // Input for the shows data
   @Input() slidesNum!: number;
   @Input() displayGenres!:boolean;
  

 


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // console.log(this.shows);
    
    
  }


  // currentSlide = 0;
  // slideWidth = 192; // Width of each movie card (adjust if needed)

  // // Slide to the next set of movies
  // nextSlide() {
  //   const totalWidth = this.slideWidth * this.shows.length;
  //   if (Math.abs(this.currentSlide) < totalWidth - this.slideWidth * 4) {
  //     this.currentSlide -= this.slideWidth;
  //   }
  // }

  // // Slide to the previous set of movies
  // prevSlide() {
  //   if (this.currentSlide < 0) {
  //     this.currentSlide += this.slideWidth;
  //   }
  // }





 

}
