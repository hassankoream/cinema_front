import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { MoviesComponent } from './components/movies/movies.component';
import { TvshowsComponent } from './components/tvshows/tvshows.component';

import { LoginComponent } from './components/login/login.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { RegisterComponent } from './components/register/register.component';
import { hasLoggedGuard } from './core/guards/has-logged.guard';
import { notLoggedGuard } from './core/guards/not-logged.guard';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MDBLayoutComponent } from './layouts/mdb-layout/mdb-layout.component';
import { LinkedLayoutComponent } from './layouts/linked-layout/linked-layout.component';
import { MoviesTimelineComponent } from './components/movies-timeline/movies-timeline.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ShowDetailsComponent } from './components/show-details/show-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PeopleComponent } from './components/people/people.component';
import { PersonComponent } from './components/person/person.component';
import { PersonShowsComponent } from './components/person-shows/person-shows.component';
import { FullShowCastComponent } from './components/full-show-cast/full-show-cast.component';
import { ShowCollectionComponent } from './components/show-collection/show-collection.component';
import { NetworkDetailsComponent } from './components/network-details/network-details.component';
import { KeywordShowsComponent } from './components/keyword-shows/keyword-shows.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { FavouritesShowsComponent } from './components/favourites-shows/favourites-shows.component';
import { MovieTheaterComponent } from './components/movie-theater/movie-theater.component';
import { TvTheaterComponent } from './components/tv-theater/tv-theater.component';
import { DiscoverComponent } from './components/discover/discover.component';

export const routes: Routes = [
    { path: '', component: AuthLayoutComponent, canActivate: [hasLoggedGuard],
        
        children:[
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'signup', component: RegisterComponent },
        


        ]
    },
    { path: '', component: BlankLayoutComponent, canActivate: [notLoggedGuard],
        
        children:[

            { path: '', redirectTo: 'home', pathMatch: 'full' },

            { path: 'home', component: HomeComponent, title:'home' },
            { path: 'm', component: MDBLayoutComponent, children:[
                
                { path: 'movies/:category', component: MoviesComponent, title:'movies' },
                // { path: 'movie-details/:id/:type', component: MovieDetailsComponent },
                
                { path: 'tvshows/:tvCate', component: TvshowsComponent, title:'tv-shows'  },
                { path: 'people/:pCate', component: PeopleComponent, title:'people'  },
                { path: 'discover', component: DiscoverComponent },
                { path: 'person/:id', component: PersonComponent },
                { path: 'person-shows/:id', component: PersonShowsComponent },
                { path: 'show-details/:type/:id', component: ShowDetailsComponent},
                { path: 'show-details/:type/:id/cast&crew', component: FullShowCastComponent },
                { path: 'show-details/:type/:id/collection/:CollectionId', component: ShowCollectionComponent },
                { path: 'network/:id', component: NetworkDetailsComponent},
                { path: 'keyword/:name/:show_type', component: KeywordShowsComponent},
                { path: 'watchlist', component: WatchlistComponent},
                { path: 'favourites', component: FavouritesShowsComponent},
                { path: 'Theater/:type/:id', component: MovieTheaterComponent},
                { path: 'showTheater/:type/:id', component: TvTheaterComponent},
               
            ] },
           
            { path: 'linked', component: LinkedLayoutComponent, children:[
                { path: 'timeline', component: TimelineComponent, title:'timeline'  },
                { path: 'social-club', component: MoviesTimelineComponent, title:'social-club' },
            ] },
            { path: 'search-results', component: SearchResultsComponent },
       


        ]
    },
    {
        path:'**', component:NotFoundComponent
    }
    
    

];
