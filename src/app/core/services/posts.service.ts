import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  

  

  constructor(private _HttpClient: HttpClient) { 
    
    
  }

  lastPage!: number;



  createPost(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.socialAppUrl}posts`, data)
  }
  updatePost(postId:string, data:object):Observable<any>{
    return this._HttpClient.put(`${environment.socialAppUrl}posts/${postId}`, data)
  }
  deletePost(postId:string):Observable<any>{
    return this._HttpClient.delete(`${environment.socialAppUrl}posts/${postId}`)
  }
  // in all the app, may I will not use it
  getAllPosts():Observable<any>{
    return this._HttpClient.get(`${environment.socialAppUrl}posts` )
  }
  getLimitedPosts(page?:number):Observable<any>{
    return this._HttpClient.get(`${environment.socialAppUrl}posts?page=${page}` )
  }
  getUserPosts():Observable<any>{
    return this._HttpClient.get(`${environment.socialAppUrl}users/664bcf3e33da217c4af21f00/posts`)
  }
  getSinglePost(postId:string):Observable<any>{
    return this._HttpClient.get(`${environment.socialAppUrl}posts/${postId}`)
  }
  // getLastPage():Observable<any>{
  //   return this._HttpClient.get(`${environment.socialAppUrl}posts` ).subscribe({
  //     next:(res:any)=>{
  //        this.lastPage = (res.paginationInfo.numberOfPages)
  //         res.paginationInfo.numberOfPages
  //     }
  //   })
  // } 

}
