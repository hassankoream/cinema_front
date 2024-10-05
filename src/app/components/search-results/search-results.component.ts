import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ISearchItem } from '../../core/interfaces/i-search-item';
import { SearchService } from '../../core/services/search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

  private readonly _SearchService = inject(SearchService)
  searchResults: ISearchItem[] = [];
  searchTerm!:string;
  searchNotFound!:boolean;

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
  clearSearchTerm(): void {
    this.searchTerm = '';
    this.searchItem(''); // Optionally clear search results or fetch initial data
}


}
