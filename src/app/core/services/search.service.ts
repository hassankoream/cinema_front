import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // constructor() { }
  // https://www.themoviedb.org/search?query=ahed
  private readonly _HttpClient = inject(HttpClient)
  getSearchResults(term:string, page:number):Observable<any>{
    // https://api.themoviedb.org/3/tv/popular?api_key=4cbb9cce4699a5bf6be2e9f19350c3f9&language=en-US&page=1&include_adult=false

  return this._HttpClient.get(`https://api.themoviedb.org/3/search/multi?api_key=${environment.apiKey}&query=${term}&page=${page}`)
 }

}
