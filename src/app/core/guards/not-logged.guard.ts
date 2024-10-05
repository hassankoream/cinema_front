import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const notLoggedGuard: CanActivateFn = (route, state) => {
  // this not a class
  const _Router= inject(Router)




  // global objects like: window, local storage, location, navigation, etc in the browser
  
  // and I use SSR, so it will render first in the server and the server doesn't have theses objects. you could use platform id
  
  
  if (typeof localStorage !== 'undefined') {
  
    
    if (localStorage.getItem('S&MToken') !== null) {
  
      return true; // User is authenticated
      
    }
    else {
      _Router.navigate(['/login']); // Navigate to login page if user is not authenticated
      return false; // User is not authenticated, redirect to login page
    }
  }
  else{
    return false;
  }
};
