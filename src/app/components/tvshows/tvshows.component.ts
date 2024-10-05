import { Component, HostListener, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostsService } from '../../core/services/posts.service';
import { NgIf, NgClass, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormatTitlePipe } from '../../core/pipes/format-title.pipe';
import { PercentagePipe } from '../../core/pipes/percentage.pipe';
import { SplitTitlePipe } from '../../core/pipes/split-title.pipe';
import { ArrowtopComponent } from '../../shared/monocompo/arrowtop/arrowtop.component';
import { ProgressCircleComponent } from '../progress-circle/progress-circle.component';
import { TvShowsService } from '../../core/services/tv-shows.service';
import { IShow } from '../../core/interfaces/ishow';

@Component({
  selector: 'app-tvshows',
  standalone: true,
  imports: [RouterLink,FormatTitlePipe,PercentagePipe, SplitTitlePipe, NgIf, ArrowtopComponent, FormsModule, NgClass, NgStyle, ProgressCircleComponent],
  templateUrl: './tvshows.component.html',
  styleUrl: './tvshows.component.css'
})
export class TvshowsComponent {
  
  //  inject services
  // private readonly _MoviesService = inject(MoviesService);
  private readonly _TvShowsService = inject(TvShowsService);
  private readonly _PostsService = inject(PostsService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);


  // initialize variables

  // moviesList:Imovie[]=[];
  showsList:IShow[]=[];
  MAX_PAGES:number = 500;
  currentPage:number=1;
  lastPage!:number;
  imageUrl:string="https://image.tmdb.org/t/p/w300/";
  shareCurrentImage!:string
  category!: string;

  //  create post vars 
  savedFile!:File | null
  content!:string
  isFileOver: boolean = false;
  previewUrl: any;
  msgError!:string;


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
      this.category = params.get('tvCate')!;
      // console.log(this.category);
      
      this.fetchShows(1);
    });

    // this._MoviesService.getNowPLayingMovies().subscribe({
    //   next:(res)=>{
    //     // this.browserLog('getNowPLayingMovies',res)
    //   },
    //   error:(err)=>{
        
    //   },
    // });
    // this._MoviesService.getTopRatedMovies().subscribe({
    //   next:(res)=>{
    //   // this.browserLog('getTopRatedMovies',res)
    //   },
    //   error:(err)=>{
        
    //   },
    // });
    // this._MoviesService.getUpcomingMovies().subscribe({
    //   next: (res) => {
    //     // this.browserLog('getUpcomingMovies',res);
    //   },
    //   error: (err) => {
    //     // Handle the error here
    //   },
    // });
    
    // this._MoviesService.getMovieDetails(365177).subscribe({
    //   next: (res) => {
    //     // this.browserLog('getMovieDetails',res);
    //   },
    //   error: (err) => {
    //     // Handle the error here
    //   },
    // });
    
    // this._MoviesService.getMovieTrailers(365177).subscribe({
    //   next: (res) => {
    //     // this.browserLog('getMovieTrailers',res);
    //   },
    //   error: (err) => {
    //     // Handle the error here
    //   },
    // });
    
    // this._MoviesService.getMovieCredits(365177).subscribe({
    //   next: (res) => {
    //     // this.browserLog('getMovieCredits',res);
    //   },
    //   error: (err) => {
    //     // Handle the error here
    //   },
    // });
    
    // this._MoviesService.getMovieImages(365177).subscribe({
    //   next: (res) => {
    //     // this.browserLog('getMovieImages',res);
    //   },
    //   error: (err) => {
    //     // Handle the error here
    //   },
    // });
    
    // this._MoviesService.getMovieRecommendations(365177).subscribe({
    //   next: (res) => {
    //     // this.browserLog('getMovieRecommendations',res);
    //   },
    //   error: (err) => {
    //     // Handle the error here
    //   },
    // });
    



  };


  fetchShows(page: number): void {

  // Call appropriate API based on category
  if (this.category === 'popular') {
    // Call API for popular movies
   this.callAPI(this.category, page)
  } else if (this.category === 'airing_today') {
    // Call API for now-playing movies
    this.callAPI(this.category, page)
  }else if (this.category === 'on_the_air') {
    // Call API for upcoming movies
    this.callAPI(this.category, page)
  }else if (this.category === 'top_rated') {
    // Call API for now-playing movies
    this.callAPI(this.category, page)
  }
  

    




  }


  callAPI(c:string, p:number){
    // console.log(c,p);
    
    this._TvShowsService.getTvShows(c,p).subscribe({
      next: (res) => {
        // console.log(res);
        this.lastPage = res.total_pages
        if (this.lastPage < this.MAX_PAGES) {
          this.MAX_PAGES = this.lastPage
          
        }
        // console.log(this.MAX_PAGES);
        
        
        this.showsList = res.results;
        // console.log(this.showsList);
        
        this.currentPage = p;
        // console.log(this.moviesList, this.currentPage);
        
      },
      error: (err) => {
        console.error("Error fetching movies:", err);
      },
    });
  }

  nextPage(): void {
    if (this.currentPage < this.MAX_PAGES) {
      this.fetchShows(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.fetchShows(this.currentPage - 1);
    }
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




  //  post logic

  test(e:Event){
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
 showModal(movieImg:string, id:number) {
  this.shareCurrentImage= movieImg+id;
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

  
  let newContent = "ms"+','+this.shareCurrentImage+','+this.content
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


   browserLog(message: any, res:any) {
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



}
