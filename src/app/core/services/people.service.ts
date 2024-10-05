import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private readonly _HttpClient = inject(HttpClient)

  getPopularPeople(pageNum?:number):Observable<any>{

  return this._HttpClient.get(`${environment.url}person/popular?api_key=${environment.apiKey}&page=${pageNum}`)
 }
  getTrendingPeople(pageNum?:number):Observable<any>{
    // https://api.themoviedb.org/3/trending/person/{time_window}

  return this._HttpClient.get(`${environment.url}trending/person/week?api_key=${environment.apiKey}&page=${pageNum}`)
 }


 getPersonDetails(personID:number):Observable<any>{
  return this._HttpClient.get(`${environment.url}person/${personID}?api_key=${environment.apiKey}`)

 }
 getPersonCredits(personID:number):Observable<any>{
  return this._HttpClient.get(`${environment.url}person/${personID}/combined_credits?api_key=${environment.apiKey}`)

 }
 getPersonExternalIDs(personID:number):Observable<any>{
  return this._HttpClient.get(`${environment.url}person/${personID}/external_ids?api_key=${environment.apiKey}`)

 }

}
