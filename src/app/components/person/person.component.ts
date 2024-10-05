import { Result } from './../../core/interfaces/i-review';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PeopleService } from '../../core/services/people.service';
import { Title } from '@angular/platform-browser';
import { IPerson, person_Ex_ids } from '../../core/interfaces/i-person';
import { MovieSliderComponent } from "../movie-slider/movie-slider.component";
import { IShow } from '../../core/interfaces/ishow';
import { DatePipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { AgePipe } from '../../core/pipes/age.pipe';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [MovieSliderComponent, NgIf, NgStyle, NgClass, NgFor, AgePipe,DatePipe, RouterLink],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent {

  // @ViewChild('swiperWrapper', { static: true }) swiperWrapper!: ElementRef;

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _PeopleService = inject(PeopleService);
  private readonly _Title = inject(Title)




  // vars

  personDetails!: IPerson;
  personID!:number;
  mainImageUrl: string = 'https://image.tmdb.org/t/p/w500'
  castShows:IShow[]=[];
  crewShows:IShow[]=[];
  ex_Ids!:person_Ex_ids;


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadPerson()
  }


  loadPerson() {
    this._ActivatedRoute.params.subscribe({
      next: (params) => {
        this.personID = params['id'];
  
        // Fetch Person Details
        this._PeopleService.getPersonDetails(this.personID).subscribe({
          next: (res) => {
            // console.log(res);
            
            this.personDetails = res as IPerson;
            this._Title.setTitle(((this.personDetails.name) + ' - ' + 'CinemaX'));
          },
          error: (err) => {
            console.error("Error fetching person details", err);
          }
        });
  
        // Fetch Person Credits (cast and crew)
        this._PeopleService.getPersonCredits(this.personID).subscribe({
          next: (res) => {
            // Sort Cast Shows (either by release_date for movies or first_air_date for TV shows)
            this.castShows = res.cast.sort((a:any, b:any) => {
              const dateA = new Date(a.release_date || a.first_air_date);
              const dateB = new Date(b.release_date || b.first_air_date);
  
              // return dateA.getTime() - dateB.getTime(); // Ascending order (oldest first)
              return dateB.getTime() - dateA.getTime(); // Descending order (newest first)
            });
  
            // Sort Crew Shows (either by release_date for movies or first_air_date for TV shows)
            this.crewShows = res.crew.sort((a:any, b:any) => {
              const dateA = new Date(a.release_date || a.first_air_date);
              const dateB = new Date(b.release_date || b.first_air_date);
              return dateB.getTime() - dateA.getTime(); // Descending order (newest first)
              // return dateA.getTime() - dateB.getTime(); // Ascending order (oldest first)
            });
  
            // Logging for debugging purposes
            // console.log('Sorted Cast Shows:', this.castShows);
            // console.log('Sorted Crew Shows:', this.crewShows);
          },
          error: (err) => {
            console.error("Error fetching person credits", err);
          }
        });

        // fetch person ex Ids

        this._PeopleService.getPersonExternalIDs(this.personID).subscribe({
          next: (res) => {
            // console.log(res);
            this.ex_Ids = res;
            
          
          },
          error: (err) => {
            console.error("Error fetching person Ex Ids", err);
          }
        });



      },
      error: (err) => {
        console.error("Error fetching route params", err);
      }
    });
  }
  

// Method to filter shows based on birthdate
filterShowsByBirthdate(shows: any[], birthday: string) {
  const birthDate = new Date(birthday);

  // Filter through all shows (cast and crew)
  return shows.filter(show => {
    const showDate = show.first_air_date || show.release_date; // Use first_air_date for TV shows or release_date for movies
    if (!showDate) return false; // Skip if there's no valid date

    const parsedShowDate = new Date(showDate);
    // Return only shows where the date is after the birthdate
    return parsedShowDate >= birthDate;
  });
}


// Function to scroll to the next set of slides
// nextSlide(): void {
//   const swiper = this.swiperWrapper.nativeElement;
//   const scrollAmount = swiper.clientWidth; // Scroll by the width of the container
//   swiper.scrollLeft += scrollAmount; // Move to the right
// }

// // Function to scroll to the previous set of slides
// prevSlide(): void {
//   const swiper = this.swiperWrapper.nativeElement;
//   const scrollAmount = swiper.clientWidth;
//   swiper.scrollLeft -= scrollAmount; // Move to the left
// }

  showFullContent: boolean = false;
  wordLimit: number = 20; // Set the word limit

  // Method to toggle content display
  toggleContent() {
    this.showFullContent = !this.showFullContent;
  }

  // Method to get truncated content
  getTruncatedContent(content: string): string {
    const words = content.split(' ');
    if (words.length > this.wordLimit) {
      return words.slice(0, this.wordLimit).join(' ') + '...';
    }
    return content;
  }

  // Method to check if the content is too long
  isContentLong(content: string): boolean {
    return content.split(' ').length > this.wordLimit;
  }

}
