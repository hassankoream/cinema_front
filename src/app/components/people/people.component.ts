import { Component, inject } from '@angular/core';
import { PeopleService } from '../../core/services/people.service';
import { DiscoverShowsService } from '../../core/services/discover-shows.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IPerson } from '../../core/interfaces/i-person';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FormatTitlePipe } from '../../core/pipes/format-title.pipe';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle,NgClass, FormatTitlePipe, RouterLink],
  templateUrl: './people.component.html',
  styleUrl: './people.component.css'
})
export class PeopleComponent {

  private readonly _PeopleService = inject(PeopleService);
  private readonly _DiscoverShowsService = inject(DiscoverShowsService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  category!: string;
  peopleList!:IPerson[];
  imageUrl:string="https://image.tmdb.org/t/p/w300/";
  MAX_PAGES:number = 500;
  currentPage:number=1;
  lastPage!:number;


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this._ActivatedRoute.paramMap.subscribe(params => {
      this.category = params.get('pCate')!;
      // console.log(this.category);
      this.fetchPeople(1);
      
     
      
      
    });
  
     



  }


  fetchPeople(page: number): void {
    // console.log(this.currentPage);
    // console.log(page);
   
    // console.log(this.category);
    
    
    

    if (this.category =='trending') {
      this._PeopleService.getTrendingPeople(page).subscribe({
        next: (res) => {
          this.lastPage = res.total_pages
          if (this.lastPage < this.MAX_PAGES) {
            this.MAX_PAGES = this.lastPage
            
          }
          this.peopleList = res.results
          this.currentPage = page;
        //  console.log(res);
         
        },
        error: (err) => {
          // Handle the error here
        },
      });
    }
    else if(this.category =='popular'){
      this._PeopleService.getPopularPeople(page).subscribe({
        next: (res) => {
          this.lastPage = res.total_pages
          if (this.lastPage < this.MAX_PAGES) {
            this.MAX_PAGES = this.lastPage
            
          }
          this.peopleList = res.results
          this.currentPage = page;
        //  console.log(res);
         
        },
        error: (err) => {
          // Handle the error here
        },
      });

    }

  
    }
  
  
  

  nextPage(): void {
    if (this.currentPage < this.MAX_PAGES) {
      this.fetchPeople(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.fetchPeople(this.currentPage - 1);
    }
  }

  goFirst(): void {
    if (this.currentPage > 1) {
      this.fetchPeople(1);
    }
  }

  goLast(): void {
    if (this.currentPage < this.MAX_PAGES) {
      this.fetchPeople(this.MAX_PAGES);
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
