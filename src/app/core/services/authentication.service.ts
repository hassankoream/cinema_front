import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {



  private readonly _HttpClient = inject(HttpClient)
  private readonly _Router=inject(Router)


  userData: any = null;
  setHeaders() {
    const token = localStorage.getItem('S&MToken');
  if (!token) {
    throw new Error('No token found'); // or handle it in another way, like redirecting to login
  }
  return new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  }
  


  signUp(data:object):Observable<any>{
  return  this._HttpClient.post(`${environment.socialAppUrl}users/signup`, data)
  }
  signIn(data:object):Observable<any>{
  return  this._HttpClient.post(`${environment.socialAppUrl}users/signin`, data)
  }
  changePassword(data:object):Observable<any>{
  return  this._HttpClient.patch(`${environment.socialAppUrl}users/change-password`, data)
  }
  uploadProfilePhoto(data:object):Observable<any>{
  return  this._HttpClient.put(`${environment.socialAppUrl}users/upload-photo`, data)
  }
  GetLoggedUserData():Observable<any> {
    return this._HttpClient.get(`${environment.socialAppUrl}users/profile-data`, {
      headers: this.setHeaders() // Call the function to get headers
    });
  }
  

  decodeUserData():any{
    // localStorage.getItem('S&MToken')
    // use ! to prevent error type checking
    // must use if 
    if (localStorage.getItem('S&MToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('S&MToken') !);
      // don't use plus sign to concat
      console.log('userData: ', this.userData);
    }
  
    
  }

  

  logOut(){
    localStorage.removeItem('S&MToken');
    this.userData = null;
    // remove token from API with call


    // navigate to login page

     window.location.href = '/login';

    //  this._Router.navigate(['/login']);
  }

  // setEmailVerify(data:object):Observable<any>{
  //   return this._HttpClient.post(`${environment.socialAppUrl}auth/forgotPasswords`, data)
  // }
  // setCodeVerify(data:object):Observable<any>{
  //   return this._HttpClient.post(`${environment.socialAppUrl}auth/verifyResetCode`, data)
  // }
  // resetPassword(data:object):Observable<any>{
  //   return this._HttpClient.put(`${environment.socialAppUrl}auth/resetPassword`, data)
  // }
}
