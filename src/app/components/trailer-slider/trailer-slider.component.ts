import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, inject, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { IShow } from '../../core/interfaces/ishow';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { TvShowsService } from '../../core/services/tv-shows.service';
import { ShowModalComponent } from "../show-modal/show-modal.component";

@Component({
  selector: 'app-trailer-slider',
  standalone: true,
  imports: [NgStyle, NgFor, NgClass, NgIf, ShowModalComponent],
  templateUrl: './trailer-slider.component.html',
  styleUrl: './trailer-slider.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TrailerSliderComponent {

  // Movie data (this can be dynamically fetched from an API)
  private readonly _MoviesService = inject(MoviesService);
  private readonly _TvShowsService = inject(TvShowsService);



  @Input() shows: IShow[] = []; // Input for the shows data
  @Input() slidesNum!: number // Input for the shows data
  selectedMovie: any = null;
  selectedMovieUrl: string = '';



  openModal(show: IShow) {
    this.selectedMovie = show;
  
    
      this._MoviesService.getShowTrailers(show.id, show.media_type).subscribe({
        next: (res) => {
          // First try to find the official trailer
          const officialTrailer = res.results.find((video: any) => video.name === 'Official Trailer');
          
          // If official trailer is found, use it
          if (officialTrailer) {
            const youtubeUrl = `https://www.youtube.com/embed/${officialTrailer.key}`;
            
            this.selectedMovieUrl = youtubeUrl;
          } 
          // If no official trailer is found, use the first available video
          else if (res.results.length > 0) {
            const firstVideo = res.results[0];  // Get the first video as fallback
            const youtubeUrl = `https://www.youtube.com/embed/${firstVideo.key}`;
           
            this.selectedMovieUrl = youtubeUrl;
          } 
          // If no videos are available, clear the URL
          else {
            console.log('No trailers found.');
            this.selectedMovieUrl = '';  // No trailers found
          }
        },
        error: (err) => {
          console.error('Error fetching show trailers:', err);
        }
      });
    
  }
  
  
  backgroundStyle: { [key: string]: string } = { 
    'background-size': 'cover',
    'background-position': 'top',
    'transition': 'all 0.5s ease-in-out' // Add transition to the inline styles
  }; // Object to hold dynamic background styles

  onHover(show: IShow) {
  
    
    const imageUrl = `https://image.tmdb.org/t/p/original/${show.backdrop_path}`;
    this.backgroundStyle = {
      ...this.backgroundStyle,
      'background-image': `linear-gradient(rgba(3, 37, 65, 0.8), rgba(3, 37, 65, 0.8)), url(${imageUrl})`
    };
   
  }

  
  closeModal() {
    this.selectedMovie = null;
    this.selectedMovieUrl = '';
  }

}
