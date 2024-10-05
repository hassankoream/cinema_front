import { isPlatformBrowser } from '@angular/common';
import { inject, afterRender, afterNextRender, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const hasLoggedGuard: CanActivateFn = (route, state) => {
   // this not a class
   const _Router= inject(Router)


  //   replace of localStorage is this platFormID and afterRender()

  //  after render is another method
  afterRender(()=>{

  })
  afterNextRender(()=>{

  })



   const _PLATFORM_ID= inject(PLATFORM_ID)





if (isPlatformBrowser (_PLATFORM_ID)) {
  if (localStorage.getItem('S&MToken') !== null) {
    _Router.navigate(['/home']); // Navigate to home page if user is authenticated
    return false; 
     
     
   }
   else {
    // Navigate to login page if user is not authenticated
    return true; // User is not authenticated
   }
  
}
else{
  return false;
}


};
