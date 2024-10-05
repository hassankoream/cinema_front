import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  const _PLATFORM_ID = inject(PLATFORM_ID);
  if (req.url.includes('linked')) {
    if (isPlatformBrowser(_PLATFORM_ID)) {

      if (localStorage.getItem('S&MToken') !==null) {
        req = req.clone({
          setHeaders:{token: localStorage.getItem('S&MToken') ! }
        })
      }
    }
  }

 
  


  return next(req);
};
