import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private readonly _HttpClient = inject(HttpClient)


  getMovies(cate: string, pageNum?: number): Observable<any> {
    // https://api.themoviedb.org/3/movie/popular?api_key=4cbb9cce4699a5bf6be2e9f19350c3f9&language=en-US&page=1&include_adult=false

    return this._HttpClient.get(`${environment.url}movie/${cate}?api_key=${environment.apiKey}&page=${pageNum}`)
  }
  getPopularPeople(cate: string, pageNum?: number): Observable<any> {
    // https://api.themoviedb.org/3/movie/popular?api_key=4cbb9cce4699a5bf6be2e9f19350c3f9&language=en-US&page=1&include_adult=false

    return this._HttpClient.get(`${environment.url}person/popular?api_key=${environment.apiKey}&page=${pageNum}`)
  }

  getPopularMovies(pageNum?: number): Observable<any> {
    // https://api.themoviedb.org/3/movie/popular?api_key=4cbb9cce4699a5bf6be2e9f19350c3f9&language=en-US&page=1&include_adult=false

    return this._HttpClient.get(`${environment.url}movie/popular?api_key=${environment.apiKey}&page=${pageNum}`)
  }
  getTrendingShows(showType?: string, timeWindow?: string, pageNum?: number): Observable<any> {
    // https://api.themoviedb.org/3/trending/{show-type}/{time_window}?api_key={}&page=1

    // Provide default values if the parameters are not passed
    showType = showType || 'movie';        // Default to 'tv' if not provided
    timeWindow = timeWindow || 'day';   // Default to 'day' if not provided
    pageNum = pageNum || 1;

    return this._HttpClient.get(`${environment.url}trending/${showType}/${timeWindow}?api_key=${environment.apiKey}&page=${pageNum}`)
  }
  // Assuming you have an HTTP service to fetch data
  getMovieGenres(): Observable<any> {
    return this._HttpClient.get(`${environment.url}genre/movie/list?api_key=${environment.apiKey}`);
  }

  getTvGenres(): Observable<any> {
    return this._HttpClient.get(`${environment.url}genre/tv/list?api_key=${environment.apiKey}`);
  }
  getNowPLayingMovies(): Observable<any> {
    // https://api.themoviedb.org/3/movie/now_playing?api_key=YOUR_API_KEY&language=en-US&page=1

    return this._HttpClient.get(`${environment.url}movie/now_playing?api_key=${environment.apiKey}&language=en-US&page=1`)
  }
  getTopRatedMovies(): Observable<any> {
    // https://api.themoviedb.org/3/movie/top_rated?api_key=YOUR_API_KEY&language=en-US&page=1

    return this._HttpClient.get(`${environment.url}movie/top_rated?api_key=${environment.apiKey}&language=en-US&page=1`)
  }
  getUpcomingMovies(): Observable<any> {
    // https://api.themoviedb.org/3/movie/upcoming?api_key=YOUR_API_KEY&language=en-US&page=1

    return this._HttpClient.get(`${environment.url}movie/upcoming?api_key=${environment.apiKey}&language=en-US&page=1`);
  }

  getShowDetails(showId: number, type: string): Observable<any> {
    // https://api.themoviedb.org/3/movie/{movie_id}?api_key=YOUR_API_KEY&language=en-US

    return this._HttpClient.get(`${environment.url}${type}/${showId}?api_key=${environment.apiKey}`);
  }

  getShowTrailers(showId: number, type: string): Observable<any> {
    // https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=YOUR_API_KEY&language=en-US

    return this._HttpClient.get(`${environment.url}${type}/${showId}/videos?api_key=${environment.apiKey}`);
  }

  getMovieCredits(showId: number, type: string): Observable<any> {
    // https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=YOUR_API_KEY

    return this._HttpClient.get(`${environment.url}${type}/${showId}/credits?api_key=${environment.apiKey}`);
  }
  getShowCredits(showId: number, type: string): Observable<any> {
    // https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=YOUR_API_KEY

    return this._HttpClient.get(`${environment.url}${type}/${showId}/aggregate_credits?api_key=${environment.apiKey}`);
  }

  getShowImages(showId: number, type: string): Observable<any> {
    // https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=YOUR_API_KEY

    return this._HttpClient.get(`${environment.url}${type}/${showId}/images?api_key=${environment.apiKey}`);
  }
  getShowVideos(showId: number, type: string): Observable<any> {
    // https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=YOUR_API_KEY

    return this._HttpClient.get(`${environment.url}${type}/${showId}/videos?api_key=${environment.apiKey}`);
  }

  getShowRecommendations(showId: number, type: string, page: number): Observable<any> {
    // https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=YOUR_API_KEY&language=en-US&page=1

    return this._HttpClient.get(`${environment.url}${type}/${showId}/recommendations?api_key=${environment.apiKey}&page=${page}`);
  }

  getShowReviews(showId: number, type: string): Observable<any> {
    // https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=YOUR_API_KEY

    return this._HttpClient.get(`${environment.url}${type}/${showId}/reviews?api_key=${environment.apiKey}`);
  }
  getShowExternalIDs(showId: number, type: string): Observable<any> {
    // https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=YOUR_API_KEY

    return this._HttpClient.get(`${environment.url}${type}/${showId}/external_ids?api_key=${environment.apiKey}`);
  }
  getShowSimilar(showId: number, type: string): Observable<any> {
    // https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=YOUR_API_KEY

    return this._HttpClient.get(`${environment.url}${type}/${showId}/similar?api_key=${environment.apiKey}`);
  }
  getShowLists(showId: number, type: string): Observable<any> {
    // https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=YOUR_API_KEY

    return this._HttpClient.get(`${environment.url}${type}/${showId}/lists?api_key=${environment.apiKey}`);
  }
  getShowKeywords(showId: number, type: string): Observable<any> {
    // https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=YOUR_API_KEY

    return this._HttpClient.get(`${environment.url}${type}/${showId}/keywords?api_key=${environment.apiKey}`);
  }

  getCollection(collection_id: number): Observable<any> {
    // https://api.themoviedb.org/3/collection/{collection_id}
    return this._HttpClient.get(`${environment.url}collection/${collection_id}?api_key=${environment.apiKey}`);
  }
  getNetworkDetails(network_id: number): Observable<any> {
    // https://api.themoviedb.org/3/network/{network_id}
    return this._HttpClient.get(`${environment.url}network/${network_id}?api_key=${environment.apiKey}`);
  }
  getKeywordDetails(keyword_name: string, type: string): Observable<any> {


    //  https://api.themoviedb.org/3/discover/movie

    return this._HttpClient.get(`${environment.url}discover/${type}?api_key=${environment.apiKey}&with_keywords=${keyword_name}`);
  }


  getSeasonDetails(showId: number, seasonNum: number): Observable<any> {
    // https://api.themoviedb.org/3/tv/84773/season/1?api_key=4cbb9cce4699a5bf6be2e9f19350c3f9
    return this._HttpClient.get(`${environment.url}tv/${showId}/season/${seasonNum}?api_key=${environment.apiKey}`);
  }


  discoverMovies(
    genre: number|null = 28, // Default genre
    year: number | null= 2024, // Default year
    sort_by: string |null= 'popularity', // Default sorting criteria
    order: string = 'desc' // Default order
  ): Observable<any> {
    return this._HttpClient.get(
      `${environment.url}discover/movie?api_key=${environment.apiKey}&primary_release_year=${year}&with_genres=${genre}&sort_by=${sort_by}.${order}`
    );
  }
  discoverShows(
    genre: number = 28, // Default genre
    year: number = 2024, // Default year
    sort_by: string = 'popularity', // Default sorting criteria
    order: string = 'desc' // Default order
  ): Observable<any> {
    return this._HttpClient.get(
      `${environment.url}discover/movie?api_key=${environment.apiKey}&first_air_date_year=${year}&with_genres=${genre}&sort_by=${sort_by}.${order}`
    );
  }


}
