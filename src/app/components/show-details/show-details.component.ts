
import { NgIf, NgFor, DatePipe, NgStyle, SlicePipe, isPlatformBrowser, CurrencyPipe, NgClass } from '@angular/common';
import { Component, inject, CUSTOM_ELEMENTS_SCHEMA, Input, HostListener, ViewChild, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ImDetails } from '../../core/interfaces/im-details';
import { MoviesService } from '../../core/services/movies.service';
import { ToHourPipe } from '../../core/pipes/to-hour.pipe';
import { ProgressCircleComponent } from "../progress-circle/progress-circle.component";
import { PercentagePipe } from '../../core/pipes/percentage.pipe';
import { Icredit } from '../../core/interfaces/icredit';

import { Title } from '@angular/platform-browser';
import { FireStoreService } from '../../core/services/fire-store.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { IUser } from '../../core/interfaces/i-user';
import { IReview, Result } from '../../core/interfaces/i-review';
import { TrimFirstPipe } from '../../core/pipes/trim-first.pipe';
import { IShow } from '../../core/interfaces/ishow';
import { MovieSliderComponent } from '../movie-slider/movie-slider.component';
import { CastSliderComponent } from "../cast-slider/cast-slider.component";
import { FormatAmountPipe } from '../../core/pipes/format-amount.pipe';
import { Ikeyword } from '../../core/interfaces/ikeyword';
import { ShowModalComponent } from '../show-modal/show-modal.component';
import { environment } from '../../core/environments/environment';

@Component({
  selector: 'app-show-details',
  standalone: true,
  imports: [NgClass, FormatAmountPipe, CurrencyPipe, RouterLink, NgIf, NgFor, DatePipe, NgStyle, ToHourPipe, ProgressCircleComponent, PercentagePipe, SlicePipe, TrimFirstPipe, MovieSliderComponent, CastSliderComponent, ShowModalComponent],
  templateUrl: './show-details.component.html',
  styleUrl: './show-details.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShowDetailsComponent {






  private readonly _MoviesService = inject(MoviesService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _Router = inject(Router)
  public _FireStoreService = inject(FireStoreService)
  private readonly _AuthenticationService = inject(AuthenticationService)
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _Title = inject(Title)

  showID!: number;
  showType!: string;
  showDetails!: ImDetails;
  showCredits!: Icredit
  showExternalIDs!: any;
  showKeywords: Ikeyword[] = [];
  showReviews!: IReview;
  showRecommendations: IShow[] = [];
  showRelated: IShow[] = [];
  reviews: Result[] = [];
  review!: Result;
  mainImageUrl: string = 'https://image.tmdb.org/t/p/w500'

  imageUrl!: string
  userID!: string
  user!: IUser
  userData!: any;
  currentStep: number = 0;

  token = localStorage.getItem('S&MToken');



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    


    // this._Router.events.subscribe(() => {
    //   // When navigating to a new show detail page, reset the currentStep
    //   this.currentStep = 0;
    //   this.loadShowDetails();

    // });
    
    this.loadShowDetails();

   
    



  };


  loadShowDetails(): void {
    // Get the show ID from the route params and load the show details
    this._ActivatedRoute.params.subscribe({
      next: (params) => {
        this.showID = params['id'];
        this.showType = params['type'];
        this.currentStep = 0;
        this.noTrailers = false;

        this._MoviesService.getShowDetails(this.showID, this.showType).subscribe({
          next: (res) => {
            // console.log('details:', res);
            this.showDetails = res;
            // Fetch the image through your proxy
            if (this.showDetails.poster_path !== null) {
              this.imageUrl = `${environment.backendUrl}/image-proxy?url=${encodeURIComponent(this.mainImageUrl + this.showDetails.poster_path)}`;
            }
           else if (this.showDetails.backdrop_path !== null) {
              this.imageUrl = `${environment.backendUrl}/image-proxy?url=${encodeURIComponent(this.mainImageUrl + this.showDetails.backdrop_path)}`;

            }
          
            else {
              this.imageUrl = '../../../assets/images/Freebie-DarkGrungeTextures-Preview-03.webp'
            }

            this.loadAndExtractColor();
            this._Title.setTitle(((this.showDetails.name || this.showDetails.title) + ' - ' + this.showType + ' - ' + 'CinemaX'));


          }
        });
        if (this.showType == 'tv') {
          this._MoviesService.getShowCredits(this.showID, this.showType).subscribe({
            next: (res) => {
              this.showCredits = res
              // console.log('credits:',res);

            }
          })
        }
        else if (this.showType == 'movie') {
          this._MoviesService.getMovieCredits(this.showID, this.showType).subscribe({
            next: (res) => {
              this.showCredits = res
              // console.log('credits:',res);

            }
          })
        }

        this._MoviesService.getShowExternalIDs(this.showID, this.showType).subscribe({
          next: (res) => {
            this.showExternalIDs = res
            // console.log('exIds:',res);

          }
        })
        this._MoviesService.getShowKeywords(this.showID, this.showType).subscribe({
          next: (res) => {
            this.showKeywords = res.results
            // console.log('keywords:',res);

          }
        })
        this._MoviesService.getShowReviews(this.showID, this.showType).subscribe({
          next: (res) => {
            this.showReviews = res
            this.reviews = res.results
            this.review = res.results[0]
            // console.log(this.showReviews.results.length-1);

            // console.log('reviews:',this.reviews);

          }
        })

        this._MoviesService.getShowRecommendations(this.showID, this.showType, 1).subscribe({
          next: (res) => {
            // console.log('recommend:',res);
            this.showRecommendations = res.results

          }
        })
        this._MoviesService.getShowSimilar(this.showID, this.showType).subscribe({
          next: (res) => {
            this.showRelated = res.results
            // console.log('similar:',res);

          }
        });


        // for watch and fav list
        this.getUserData();

        // this._MoviesService.getCollection(this.showDetails.belongs_to_collection.id).subscribe({
        //   next: (res) => {
        //     // this.showRelated = res.results
        //     console.log('collection:',res);

        //   }
        // });

        // this._MoviesService.getShowImages(this.showID, this.showType).subscribe({
        //   next: (res) => {
        //     // console.log('images:',res);

        //   }
        // })
        // this._MoviesService.getShowVideos(this.showID, this.showType).subscribe({
        //   next: (res) => {
        //     // console.log('videos:',res);

        //   }
        // })
        // Access the 'id' parameter directly
        // console.log(this.showID);
      }
    });

    // Check if the show is in the watchlist on initialization

    // Load the show details using the showId (use your API/service to load data)
    // Example:
    // this.showService.getShowDetails(showId).subscribe(details => {
    //   this.showDetails = details;
    // });
  }

  getUserData() {
    this._FireStoreService.isInWatchlist.set(false);
    this._FireStoreService.isInFavorites.set(false);
    this.token = localStorage.getItem('S&MToken');
    if (! this.token) {
      this._Router.navigate(['/login']);
    }
   else{
    this._AuthenticationService.GetLoggedUserData().subscribe({
      next: (res) => {
        this.userData = res.user
        // console.log(res);
        this._FireStoreService.getUserIDByEmail(this.userData.email).then((userID) => {
          if (userID) {
            // console.log('Found userID:', userID);
            this.userID = userID;
            // update bookmarks 
            this.checkShowInWatchlist();
            // update fav shows
            this.checkShowInFavorites();
          } else {
            console.log('User not found');
          }
        });

      }
    });
   }
  

  }

  async checkShowInWatchlist() {
    const checkInWatchlist = await this._FireStoreService.checkIfInWatchlist(this.userID, this.showID.toString());
    this._FireStoreService.isInWatchlist.set(checkInWatchlist);
  }
  async checkShowInFavorites() {
    const checkInFavorites = await this._FireStoreService.checkIfInFavorites(this.userID, this.showID.toString());
    this._FireStoreService.isInFavorites.set(checkInFavorites);
  }


  addToWatchlist() {
    if (this.userID !== undefined && this.showDetails) {
      this._FireStoreService.addToWatchlist(this.userID, this.showDetails);
    }
    else {
      console.log('user id not found');
    }
  }


  addToFavorites() {
    if (this.userID !== undefined && this.showDetails) {
      this._FireStoreService.addToFavorites(this.userID, this.showDetails);
    }
    else {
      console.log('user id not found');
    }
  }





  extractedColor: string = 'rgba(150, 90, 40, 0.4)'; // Default color

  @ViewChild('imageCanvas') imageCanvas!: any;


  loadAndExtractColor() {
    const img = new Image();
    img.src = this.imageUrl;
    // console.log(this.imageUrl);


    img.crossOrigin = 'Anonymous'; // Needed for cross-origin images
    img.onload = () => {
      const canvas = this.imageCanvas.nativeElement;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0);

      const percentageX = 0.05; // 20% of the width
      const percentageY = 0.2; // 20% of the height

      // Calculate pixel coordinates based on canvas size
      const x = Math.floor(canvas.width * percentageX);
      const y = Math.floor(canvas.height * percentageY);
      const pixelData = ctx.getImageData(x, y, 1, 1).data;

      // Construct the RGBA color
      this.extractedColor = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3] / 255})`;
    };
  }







  //  trailer show

  selectedMovieUrl: string = '';
  selectedMovie: any = null;
  noTrailers!: boolean;


  openModal(show: ImDetails) {
    // this.selectedMovie = show;

    // console.log(this.showID, this.showType);
    if (!this.noTrailers) {
      this._MoviesService.getShowTrailers(this.showID, this.showType).subscribe({
        next: (res) => {



          // First try to find the official trailer
          const officialTrailer = res.results.find((video: any) => video.name === 'Official Trailer');

          // If official trailer is found, use it
          if (officialTrailer) {
            const youtubeUrl = `https://www.youtube.com/embed/${officialTrailer.key}`;
            this.selectedMovie = show;
            this.selectedMovieUrl = youtubeUrl;

          }
          // If no official trailer is found, use the first available video
          else if (res.results.length > 0) {
            const firstVideo = res.results[0];  // Get the first video as fallback
            const youtubeUrl = `https://www.youtube.com/embed/${firstVideo.key}`;
            this.selectedMovie = show;
            this.selectedMovieUrl = youtubeUrl;

          }
          // If no videos are available, clear the URL
          else {

            // console.log('No trailers found.');
            this.noTrailers = true;
            this.selectedMovie = null;
            this.selectedMovieUrl = '';  // No trailers found


          }
        },
        error: (err) => {
          console.error('Error fetching show trailers:', err);
        }
      });
    }



  }


  closeModal() {

    this.selectedMovie = null;
    this.selectedMovieUrl = '';
    // console.log(this.selectedMovieUrl);
  }



  // addToFavorites(movie: any) {
  //   this._FireStoreService.addToFavorites(this.userID, movie)
  //     .then(() => console.log('Movie added to favorites!'))
  //     .catch(error => console.error('Error adding movie to favorites:', error));
  // }

  // Mapping of letters to colors
  letterColorMap: { [key: string]: string } = {
    A: '#FF5733', B: '#33FF57', C: '#3357FF', D: '#F0FF33',
    E: '#FF33F6', F: '#33FFF5', G: '#F733FF', H: '#FF3353',
    I: '#33FFB5', J: '#B533FF', K: '#FFB533', L: '#33B5FF',
    M: '#B5FF33', N: '#FFB5B5', O: '#B5FF57', P: '#FF5733',
    Q: '#33FF57', R: '#3357FF', S: '#F0FF33', T: '#FF33F6',
    U: '#33FFF5', V: '#F733FF', W: '#FF3353', X: '#33FFB5',
    Y: '#B533FF', Z: '#FFB533'
  };

  getColorForUsername(username: string): string {
    const firstLetter = username.charAt(0).toUpperCase();
    return this.letterColorMap[firstLetter] || '#CCCCCC'; // Default color if letter not found
  }





  nextReview() {
    // console.log(this.currentStep);

    if (this.showReviews.results.length > 0) { // Check if there are results
      if (this.currentStep < this.showReviews.results.length - 1) {
        // Move to the next review
        this.review = this.showReviews.results[this.currentStep + 1];
        this.currentStep++; // Increment the step
        this.showFullContent = false
      } else {
        // // Reset to the first review
        // this.review = this.showReviews.results[0];
        // this.currentStep = 0; // Reset the step
      }
    } else {
      // console.log('No reviews available.');
    }
  }
  prevReview() {
    // Check if there are reviews
    if (this.showReviews.results.length > 0) {
      if (this.currentStep > 0) {
        // Move to the previous review
        this.review = this.showReviews.results[this.currentStep - 1];
        this.currentStep--; // Decrement the step
        this.showFullContent = false;
      } else {
        // Optionally, you can set it to the last review (loop back)
        // this.review = this.showReviews.results[this.showReviews.results.length - 1];
        // this.currentStep = this.showReviews.results.length - 1;
      }
    } else {
      // console.log('No reviews available.');
    }
  }


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



  browserLog(message: any, res: any) {
    if (typeof window !== 'undefined') {
      console.log(message, res); // Will only log in the browser's console, not in the terminal.
    }
  }




  

}
