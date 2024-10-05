import { Result } from './../../core/interfaces/i-review';

import { Component, HostListener, inject, OnInit } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { Imovie } from '../../core/interfaces/imovie';
import { PercentagePipe } from '../../core/pipes/percentage.pipe';
import { SplitTitlePipe } from '../../core/pipes/split-title.pipe';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { ArrowtopComponent } from "../../shared/monocompo/arrowtop/arrowtop.component";
import { PostsService } from '../../core/services/posts.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProgressCircleComponent } from "../progress-circle/progress-circle.component";
import { FormatTitlePipe } from '../../core/pipes/format-title.pipe';
import { DiscoverShowsService } from '../../core/services/discover-shows.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [RouterLink, FormatTitlePipe, PercentagePipe, SplitTitlePipe, NgIf, ArrowtopComponent, FormsModule, NgClass, NgStyle, ProgressCircleComponent, ReactiveFormsModule, NgFor],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {


  //  inject services
  private readonly _MoviesService = inject(MoviesService);
  private readonly _DiscoverShowsService = inject(DiscoverShowsService);
  private readonly _PostsService = inject(PostsService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _Router = inject(Router);


  // initialize variables

  moviesList: Imovie[] = [];
  MAX_PAGES: number = 500;
  currentPage: number = 1;
  lastPage!: number;
  imageUrl: string = "https://image.tmdb.org/t/p/w300/";
  shareCurrentImage!: string
  category!: string;
  movieGenres!: any[];

  //  create post vars 
  savedFile!: File | null
  content!: string
  isFileOver: boolean = false;
  previewUrl: any;
  msgError!: string;


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this._MoviesService.getPopularMovies(1).subscribe({
    //   next:(res)=>{
    //     // console.log(res);

    //     this.moviesList = res.results
    //     this.lastPage = res.total_pages
    //   //  this.browserLog('getPopularMovies',res.results)
    //   },
    //   error:(err)=>{

    //   },
    // });

    this._ActivatedRoute.paramMap.subscribe(params => {
      this.category = params.get('category')!;
      // console.log(this.category);

      this.fetchMovies(1);


      this._MoviesService.getMovieGenres().subscribe({
        next: (res) => {
          // console.log(res);
          this.movieGenres = res.genres

        }
      })

      // this._DiscoverShowsService.discoverShows('movie', 1).subscribe({
      //   next:(res)=>{
      //     console.log(res);

      //   }
      // });
    });






  };


  fetchMovies(page: number): void {

    // Call appropriate API based on category
    if (this.category === 'popular') {
      // Call API for popular movies
      this.callAPI(this.category, page)
    } else if (this.category === 'now_playing') {
      // Call API for now-playing movies
      this.callAPI(this.category, page)
    } else if (this.category === 'upcoming') {
      // Call API for upcoming movies
      this.callAPI(this.category, page)
    } else if (this.category === 'top_rated') {
      // Call API for now-playing movies
      this.callAPI(this.category, page)
    }







  }


  callAPI(c: string, p: number) {
    // console.log(c,p);

    this._MoviesService.getMovies(c, p).subscribe({
      next: (res) => {
        // console.log(res);
        this.lastPage = res.total_pages
        if (this.lastPage < this.MAX_PAGES) {
          this.MAX_PAGES = this.lastPage

        }
        // console.log(this.MAX_PAGES);


        this.moviesList = res.results;
        this.currentPage = p;
        // console.log(this.moviesList, this.currentPage);

      },
      error: (err) => {
        console.error("Error fetching movies:", err);
      },
    });
  }

  // pagination

  nextPage(): void {
    if (this.currentPage < this.MAX_PAGES) {
      this.fetchMovies(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.fetchMovies(this.currentPage - 1);
    }
  }

  goFirst(): void {
    if (this.currentPage > 1) {
      this.fetchMovies(1);
    }
  }

  goLast(): void {
    if (this.currentPage < this.MAX_PAGES) {
      this.fetchMovies(this.MAX_PAGES);
    }
  }

  // Disable buttons based on the current page
  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    return this.currentPage === this.MAX_PAGES;
  }




  //  post logic

  test(e: Event) {
    console.log('hi', e.target);

  }
  // Close the modal and hide it
  closeModal() {
    const modal = document.getElementById('authentication-modal');
    if (modal) {

      modal.classList.add('hidden'); // Add the hidden class
      modal.classList.remove('flex'); // Remove the flex class
      // modal.setAttribute('aria-hidden', 'true'); // Update aria-hidden  // Ensure the modal is not displayed
    }
  }
  // Show the modal by removing the hidden class and adding flex
  showModal(movieImg: string, id: number) {
    this.shareCurrentImage = movieImg + id;
    // console.log(movieImg);

    const modal = document.getElementById('authentication-modal');
    if (modal) {
      modal.classList.remove('hidden'); // Remove the hidden class
      modal.classList.add('flex'); // Add the flex class
      // modal.setAttribute('aria-hidden', 'false'); // Update aria-hidden
    }
  }

  createPost(): void {
    const _formData = new FormData();

    // Check if 'content' (body) is provided
    if (!this.content || this.content.trim() === '') {
      this.msgError = 'Post content is required'
      // console.error();
      return;// Exit the function, don't proceed further
    }


    let newContent = "ms" + ',' + this.shareCurrentImage + ',' + this.content
    console.log(newContent);

    // Append the form data
    _formData.append('body', newContent);


    // console.log(_formData, this.content);

    // Call the API
    this._PostsService.createPost(_formData).subscribe({
      next: (res) => {
        if (res.message == "success") {
          console.log(res);


          // this.msgError = 'success';
          //  this.ngOnInit();

          this.content = '';

          this.closeModal();  // Hide the modal after success


        }

      },
      error: (err) => {
        this.msgError = 'try smaller image'
        console.error('Error creating post:', err);
      }
    });



  }


  goToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // For a smooth scrolling effect
    });
  }


  browserLog(message: any, res: any) {
    if (typeof window !== 'undefined') {
      console.log(message, res); // Will only log in the browser's console, not in the terminal.
    }
  }
  isButtonVisible = false;
  // Listen to the window scroll event
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Check if the user has scrolled past 100vh (100% of the viewport height)
    if (scrollPosition > window.innerHeight) {
      this.isButtonVisible = true;
    } else {
      this.isButtonVisible = false;
    }
  }



  //  filtering data


  year!: number; // Model for the input
  genre!: number; // Model for the input
  sort_by!:string;
  currentYear: number = new Date().getFullYear(); // Get the current year

  
  // onYearInput(event: any) {
  //   const inputYear = event.target.value;

  //   // Check if the entered year is within the valid range
  //   if (inputYear >= 1900 && inputYear <= this.currentYear) {
  //     console.log('Entered Year:', inputYear);
  //   } else {
  //     console.log('Please enter a year between 1900 and ' + this.currentYear);
  //   }
  // }
  movieFilterForm = new FormGroup({
    genre: new FormControl(null, Validators.required),
    year: new FormControl(null, [Validators.required, Validators.min(1900), Validators.max(this.currentYear)]),
    sort_by: new FormControl(null, Validators.required)
  });

  
  filterMovies() {
   
    if (this.movieFilterForm.valid) {
      const { genre, year, sort_by } = this.movieFilterForm.value;
      this._MoviesService.discoverMovies(genre, year, sort_by).subscribe({
        next: (res) => {
          this.moviesList = res.results;
        },
      });
    }
    else {
      console.log('Form is invalid');
    }
  
    
  }



  // 


}












// the filter section
// <!-- Sidebar -->
// <div class="w-1/5 bg-slate-100 rounded-md shadow-md mx-2 p-6 min-h-screen text-black">
//     <h2 class="text-lg font-bold mb-4 text-[#FFD700]">Filters</h2>

//     <!-- Filter Options -->
//     <form [formGroup]="movieFilterForm" (ngSubmit)="filterMovies()">
//         <div class="mb-6">
//             <label class="block mb-2 text-sm">Sort By</label>
//             <select formControlName="sort_by" class="w-full p-2 bg-[#2C3E50] rounded-lg text-[#F5F5F5]">
//                 <option value=""></option>
//                 <option value="popularity">Popularity</option>
//                 <option value="vote_average">Rating</option>
//             </select>
//             <div *ngIf="movieFilterForm.get('sort_by')?.invalid && movieFilterForm.get('sort_by')?.touched"
//                 class="text-red-500 text-sm">
//                 Sort by is required.
//             </div>
//         </div>

//         <!-- Genre (Looping Over Genres Array) -->
//         <div class="mb-6">
//             <label class="block mb-2 text-sm">Genre</label>
//             <select formControlName="genre" class="w-full p-2 bg-[#2C3E50] rounded-lg text-[#F5F5F5]">
//                 <option value="">Select a genre...</option>
//                 <!-- Loop through genres array to populate dropdown -->
//                 <option *ngFor="let genre of movieGenres" [value]="genre.id">{{ genre.name }}</option>
//             </select>
//             <div *ngIf="movieFilterForm.get('genre')?.invalid && movieFilterForm.get('genre')?.touched"
//                 class="text-red-500 text-sm">
//                 Genre is required.
//             </div>
//         </div>

//         <div class="mb-6">
//             <label class="block mb-2 text-sm">Year</label>
//             <input type="number" formControlName="year"
//                 class="w-full p-2 bg-[#2C3E50] rounded-lg text-[#F5F5F5]" [attr.max]="currentYear"
//                 placeholder="Enter Year">
//             <div *ngIf="movieFilterForm.get('year')?.invalid && movieFilterForm.get('year')?.touched"
//                 class="text-red-500 text-sm">
//                 Please enter a valid year between 1900 and {{currentYear}}.
//             </div>
//         </div>

//         <button type="submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
//             [disabled]="!movieFilterForm.valid">Apply</button>
//     </form>

// </div>