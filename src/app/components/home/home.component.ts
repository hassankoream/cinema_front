import { Component, inject } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { MovieSliderComponent } from "../movie-slider/movie-slider.component";
import { NgClass, NgFor, NgIf, SlicePipe } from '@angular/common';
import { IShow } from '../../core/interfaces/ishow';
import { TvShowsService } from '../../core/services/tv-shows.service';
import { TrailerSliderComponent } from "../trailer-slider/trailer-slider.component";
import { SearchService } from '../../core/services/search.service';
import { FormsModule } from '@angular/forms';
import { ISearchItem } from '../../core/interfaces/i-search-item';
import { RouterLink } from '@angular/router';
import { ProgressCircleComponent } from "../progress-circle/progress-circle.component";
import { PercentagePipe } from '../../core/pipes/percentage.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieSliderComponent, NgClass, TrailerSliderComponent, FormsModule, NgFor, NgIf, SlicePipe, RouterLink, ProgressCircleComponent, PercentagePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  private readonly _MoviesService = inject(MoviesService)
  private readonly _TvShowsService = inject(TvShowsService)
  private readonly _SearchService = inject(SearchService)
  selectedTrend: any= 'day'; // Default to 'day'
  selectedTrailer: any= 'tv'; // Default to 'day'
  trendingShows: IShow[] = [];
  trailersShows: IShow[] = [];
  searchResults: ISearchItem[] = [];
  searchTerm!:string;
  searchNotFound!:boolean;


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._MoviesService.getTrendingShows('all', 'day', 1).subscribe({
      next: (res) => {
        this.trendingShows = res.results

      },
      error: (err) => {

      },
    });
    this._MoviesService.getTrendingShows('tv', 'week', 1).subscribe({
      next: (res) => {
        this.trailersShows = res.results

      },
      error: (err) => {

      },
    });

    this._TvShowsService.getTrendingTvShows().subscribe({
      next: (res) => {
        // this.browserLog(res)
      },
      error: (err) => {

      },
    })



  };




  getTrends(showType?: string, timeWindow?: 'day' | 'week', pageNum?: number) {
    this.selectedTrend = timeWindow;
    this._MoviesService.getTrendingShows(showType, timeWindow, pageNum).subscribe({
      next: (res) => {

        this.trendingShows = res.results
      },
      error: (err) => {

      },
    });
  }
  getTrailersLists(showType?: 'tv' | 'movie', timeWindow?: 'week', pageNum?: number) {
    this.selectedTrailer = showType;
    this._MoviesService.getTrendingShows(showType, timeWindow, pageNum).subscribe({
      next: (res) => {

        this.trailersShows = res.results
        // this.browserLog(this.trailersShows)
      },
      error: (err) => {

      },
    });
  }

  searchItem(term:string){
  
   
    this._SearchService.getSearchResults(term, 1).subscribe({

      next:(res)=>{
        if (res.results.length === 0) {
         
          
        }
        this.searchResults = res.results
        // console.log(res.results);
        
      }

    })
  }


  isActiveTrend(filter: 'day' | 'week' | 'tv' | 'movie'): boolean {
    return this.selectedTrend === filter;
  }
  isActiveTrailer(filter:  'tv' | 'movie'): boolean {
    return this.selectedTrailer === filter;
  }

  browserLog(message: any) {
    if (typeof window !== 'undefined') {
      console.log(message); // Will only log in the browser's console, not in the terminal.
    }
  }





}
