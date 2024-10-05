import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from '../../core/environments/environment';
import { MoviesService } from '../../core/services/movies.service';
import { IShow } from '../../core/interfaces/ishow';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { SafeUrlPipe } from '../../core/pipes/safe-url.pipe';
import { ImDetails } from '../../core/interfaces/im-details';
import { Episode, ISeason } from '../../core/interfaces/i-season';
import { FormsModule } from '@angular/forms';
import { PercentagePipe } from '../../core/pipes/percentage.pipe';
import { ProgressCircleComponent } from "../progress-circle/progress-circle.component";
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-movie-theater',
  standalone: true,
  imports: [NgIf, NgFor, SafeUrlPipe, RouterLink, DatePipe, FormsModule, NgClass, PercentagePipe, ProgressCircleComponent],
  templateUrl: './movie-theater.component.html',
  styleUrls: ['./movie-theater.component.css']
})
export class MovieTheaterComponent {


  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _Router = inject(Router);
  private readonly _MoviesService = inject(MoviesService);
  private readonly _Title = inject(Title);

  showID!: number;
  showType!: string;
  showUrl!: string;
  showDetails!: ImDetails;
  seasonDetails!: ISeason;
  showRecommendations: IShow[] = [];
  mainImageUrl: string = 'https://image.tmdb.org/t/p/w500'

  selectedEpisode:WritableSignal<number> = signal(1);
  selectedSeason:WritableSignal<number> = signal(1);


  // tv show facts
  // totalEpisodes!: number;
  totalEpisodesPerSeason!: Episode[];
  totalSeasons!: number;
  seasons: number[] = [];  // Create an array to store season numbers

  // lastEpisode!:number;
  // selectedSeason: number = 1;


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadShowDetails();
  }

  loadShowDetails(): void {
    // Get the show ID from the route params and load the show details
    this._ActivatedRoute.params.subscribe({
      next: (params) => {
        this.showID = params['id'];
        this.showType = params['type'];
        if (this.showType == 'movie') {
          // Set the show URL for movies
          this.showUrl = `https://vidsrc.net/embed/${this.showType}?tmdb=${this.showID}&ds_lang=en`;
        
        
        }
        else if (this.showType == 'tv') {
          // Set the show URL for TV shows
          this.showUrl = `https://vidsrc.net/embed/${this.showType}?tmdb=${this.showID}&season=${this.selectedSeason()}&episode=${this.selectedEpisode()}&ds_lang=en`;
 
          // Fetch season data based on the selected season
          this.fetchSeasonData(this.selectedSeason());
        
         
        }
        else{
          this._Router.navigate(['/home'])
        }
        
       

       
     
        this._MoviesService.getShowDetails(this.showID, this.showType).subscribe({
          next: (res) => {
           
            this.showDetails = res;
            this.totalSeasons = this.showDetails.number_of_seasons;
            this.seasons = Array.from({ length: this.totalSeasons }, (_, i) => i + 1);  // Generate seasons array

          },

        });
       

        this._MoviesService.getShowRecommendations(this.showID, this.showType, 1).subscribe({
          next: (res) => {
           
            this.showRecommendations = res.results

          },

        });


      },
    });



  }

  // Method to go to the previous episode
  toPervEpisode() {
    if (this.selectedEpisode() > 1) {
      this.selectedEpisode.update(current => current - 1); // Move to the previous episode
  
    }
    else if (this.selectedSeason() > 1) {
      this.selectedSeason.update(current => current - 1);;  // Go to the previous season
      this.fetchSeasonData(this.selectedSeason());
      this.selectedEpisode.set(this.totalEpisodesPerSeason.length);  // Start from the last episode of the previous season
    }
    this.updateEpisode();
  }

  // // Method to go to the next episode
  toNextEpisode() {
    if (this.selectedEpisode() < this.totalEpisodesPerSeason.length) {
      this.selectedEpisode.update(current => current + 1); // Move to the next episode
     
    }
    else if (this.selectedSeason() < this.totalSeasons) {
      this.selectedSeason.update(current => current + 1);  // Go to the next season
      this.selectedEpisode.set(1);  // Start from episode 1
      this.fetchSeasonData(this.selectedSeason());
    }
    this.updateEpisode();
  }
    // Method to update the episode URL or content
    updateEpisode() {
    //   // Assuming you need to update the iframe source based on the current episode and season
    this.showUrl = `https://vidsrc.net/embed/${this.showType}?tmdb=${this.showID}&season=${this.selectedSeason()}&episode=${this.selectedEpisode()}&ds_lang=en`;

    }

    fetchSeasonData(seasonNumber: number): void {
      this._MoviesService.getSeasonDetails(this.showID, seasonNumber).subscribe({
        next: (res) => {
        //  console.log(res);
         this.seasonDetails = res;
         this.totalEpisodesPerSeason = this.seasonDetails.episodes
              
        //  this._Title.setTitle(((this.showDetails.name)+ 'season'+ this.selectedSeason()+'Episode'+ this.selectedEpisode()+ ' - ' + this.showType + ' - ' + 'CinemaX'));

        },
        

      });
    }



    selectEpisode(episodeNumber: number): void {
      // Update the selected episode
      this.selectedEpisode.set(episodeNumber);
    
      // Regenerate the show URL with the new episode number
      this.showUrl = `https://vidsrc.net/embed/${this.showType}?tmdb=${this.showID}&season=${this.selectedSeason()}&episode=${this.selectedEpisode()}&ds_lang=en`;
      // console.log(this.showUrl);
    
      // Scroll the window to the top
      window.scrollTo({ top: 0, behavior: 'smooth' });
         // Set the title for the TV show page with season and episode details
         this._Title.setTitle(`${this.showDetails.name} Season ${this.selectedSeason()} Episode ${this.selectedEpisode()} - ${this.showType} - CinemaX`);
  
    }
    
    



}
