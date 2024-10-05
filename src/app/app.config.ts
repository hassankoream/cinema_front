import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { IMAGE_CONFIG, isPlatformBrowser } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { headerInterceptor } from './core/interceptors/header.interceptor';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp } from 'firebase/app';
import { environment } from './core/environments/environment';

// Factory function to handle SSR and browser check
// function getRedirectUri() {
//   if (typeof window !== 'undefined') {
//     return window.location.origin
//   }
//  return '';
// }



export const appConfig: ApplicationConfig = {


  providers: [provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })

  ),
  provideClientHydration(),
  provideAnimations(),
  importProvidersFrom([
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFireDatabaseModule, AngularFirestoreModule
  
  ]),
  // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

  // provideFirestore(() => getFirestore()),

  //  if you used with interceptors with the movies it will get error cross origin, fix it by not sending only in the services not here
  provideHttpClient(withFetch(), withInterceptors([headerInterceptor])),
  // provideHttpClient(withFetch(), ),
  // image warn error size handling
  {
    provide: IMAGE_CONFIG,
    useValue: {
      disableImageSizeWarning: true,
      disableImageLazyLoadWarning: true
    }
  }, provideAnimationsAsync(),



  ]
};
