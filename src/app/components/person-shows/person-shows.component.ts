
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PeopleService } from '../../core/services/people.service';
import { Title } from '@angular/platform-browser';
import { MovieSliderComponent } from "../movie-slider/movie-slider.component";
import { IShow } from '../../core/interfaces/ishow';
import { DatePipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { AgePipe } from '../../core/pipes/age.pipe';
import { ProgressCircleComponent } from "../progress-circle/progress-circle.component";
import { PercentagePipe } from '../../core/pipes/percentage.pipe';
import { SplitTitlePipe } from '../../core/pipes/split-title.pipe';

@Component({
  selector: 'app-person-shows',
  standalone: true,
  imports: [MovieSliderComponent, NgIf, NgStyle, NgClass, NgFor, AgePipe, DatePipe, RouterLink, ProgressCircleComponent, PercentagePipe, SplitTitlePipe],
  templateUrl: './person-shows.component.html',
  styleUrl: './person-shows.component.css'
})
export class PersonShowsComponent {


  
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _PeopleService = inject(PeopleService);
  private readonly _Title = inject(Title);

  showList:IShow[]=[];
  personID!:number;
  mainImageUrl: string = 'https://image.tmdb.org/t/p/w500';

  MAX_PAGES:number = 500;
  currentPage:number=1;
  lastPage!:number;



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadPerson();

    
  }


  loadPerson() {
    this._ActivatedRoute.params.subscribe({
      next: (params) => {
        this.personID = params['id'];
  
  
        // Fetch Person Credits (cast and crew)
        this._PeopleService.getPersonCredits(this.personID).subscribe({
          next: (res) => {
            // Sort Cast Shows (either by release_date for movies or first_air_date for TV shows)
            this.showList = res.cast.sort((a:any, b:any) => {
              const dateA = new Date(a.release_date || a.first_air_date);
              const dateB = new Date(b.release_date || b.first_air_date);
  
              // return dateA.getTime() - dateB.getTime(); // Ascending order (oldest first)
              return dateB.getTime() - dateA.getTime(); // Descending order (newest first)
            });
  
            //  console.log(this.showList);
  
            // Logging for debugging purposes
            // console.log('Sorted Cast Shows:', this.castShows);
            // console.log('Sorted Crew Shows:', this.crewShows);
          },
          error: (err) => {
            console.error("Error fetching person credits", err);
          }
        });
      },
      error: (err) => {
        console.error("Error fetching route params", err);
      }
    });
  }

   // Pagination related logic here, like fetching more shows based on page number
   fetchShows(page: number) {
    // Logic to fetch shows from an API for a given page
  }

  // Handle navigation to the show details page
  goToShowDetails(show: IShow) {
    // Navigation logic
  }

  // Mockup of pagination functions
  prevPage() {
    // Logic for previous page
  }

  nextPage() {
    // Logic for next page
  }



goFirst(): void {
    if (this.currentPage > 1) {
      this.fetchShows(1);
    }
  }

  goLast(): void {
    if (this.currentPage < this.MAX_PAGES) {
      this.fetchShows(this.MAX_PAGES);
    }
  }

  // Disable buttons based on the current page
  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    return this.currentPage === this.MAX_PAGES;
  }
}
