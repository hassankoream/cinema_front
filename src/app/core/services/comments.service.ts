import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {



  

  constructor(private _HttpClient: HttpClient) { 

  }

  


  createComment(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.socialAppUrl}comments`, data)
  }
  getPostComments(postID:string):Observable<any>{
    return this._HttpClient.get(`${environment.socialAppUrl}posts/${postID}/comments`)
  }
  updateComment(commentID:string, data:object):Observable<any>{
    return this._HttpClient.put(`${environment.socialAppUrl}comments/${commentID}`, data)
  }
  deleteComment(commentID:string):Observable<any>{
    return this._HttpClient.delete(`${environment.socialAppUrl}comments/${commentID}`)
  }
}
