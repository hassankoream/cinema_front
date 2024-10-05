import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscoverShowsService {

  private readonly _HttpClient = inject(HttpClient)


  discoverShows(showType:string, pageNum?:number):Observable<any>{
    const today = new Date();
    const lastYear = new Date()
    lastYear.setFullYear(today.getFullYear() - 1);

    // Format dates to YYYY-MM-DD
    const formattedToday = today.toISOString().split('T')[0];
    const formattedLastYear = lastYear.toISOString().split('T')[0];
    // console.log(formattedLastYear, formattedToday);
    
    // https://api.themoviedb.org/3/discover/tv?api_key=4cbb9cce4699a5bf6be2e9f19350c3f9&page=1&sort_by=popularity.desc&first_air_date.gte=${formattedLastYear}&first_air_date.lte=${formattedToday}&with_type=4&with_origin_country=US
    

   return this._HttpClient.get(`${environment.url}discover/${showType}?api_key=${environment.apiKey}&page=${pageNum}&sort_by=popularity.desc&first_air_date.gte=${formattedLastYear}&first_air_date.lte=${formattedToday}&with_type=4&with_origin_country=US`)
  }


}
