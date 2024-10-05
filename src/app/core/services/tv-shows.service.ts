import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  private readonly _HttpClient = inject(HttpClient)

  getTvShows(cate:string, pageNum?:number):Observable<any>{
    // https://api.themoviedb.org/3/tv/popular?api_key=4cbb9cce4699a5bf6be2e9f19350c3f9&language=en-US&page=1&include_adult=false

  return this._HttpClient.get(`${environment.url}tv/${cate}?api_key=${environment.apiKey}&page=${pageNum}`)
 }

  getPopularTvShows(pageNum?:number):Observable<any>{
    
    // https://api.themoviedb.org/3/tv/popular?api_key=4cbb9cce4699a5bf6be2e9f19350c3f9&language=en-US&page=1&include_adult=false

   return this._HttpClient.get(`${environment.url}tv/popular?api_key=${environment.apiKey}&page=${pageNum}`)
  }
  getTrendingTvShows():Observable<any>{
    // https://api.themoviedb.org/3/trending/{show-type}/{time_window}?api_key={}&page=1
    // https://api.themoviedb.org/3/tv/popular?api_key=4cbb9cce4699a5bf6be2e9f19350c3f9&language=en-US&page=1&include_adult=false

   return this._HttpClient.get(`${environment.url}trending/tv/week?api_key=${environment.apiKey}`)
  }

   
  getTvTrailers(series_id: number): Observable<any> {
    // https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=YOUR_API_KEY&language=en-US
  
    return this._HttpClient.get(`${environment.url}tv/${series_id}/videos?api_key=${environment.apiKey}`);
  }
  
  
}
