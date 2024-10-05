import { Component, inject } from '@angular/core';
import { FireStoreService } from '../../core/services/fire-store.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { ImDetails } from '../../core/interfaces/im-details';
import { Router, RouterLink } from '@angular/router';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ProgressCircleComponent } from "../progress-circle/progress-circle.component";
import { PercentagePipe } from '../../core/pipes/percentage.pipe';
import { SplitTitlePipe } from '../../core/pipes/split-title.pipe';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, ProgressCircleComponent, PercentagePipe, SplitTitlePipe, DatePipe],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent {


  _FireStoreService= inject(FireStoreService);
  _AuthenticationService= inject(AuthenticationService);

  private readonly _Router = inject(Router)

  userData!: any;
  userID!: string
  watchList!:ImDetails[];
  token = localStorage.getItem('S&MToken');
  mainImageUrl: string = 'https://image.tmdb.org/t/p/w500'


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUserData();
    
  }


  getUserData() {
    this.token = localStorage.getItem('S&MToken');
    if (!this.token) {
      this._Router.navigate(['/login']);
    } else {
      this._AuthenticationService.GetLoggedUserData().subscribe({
        next: (res) => {
          this.userData = res.user;
          this._FireStoreService.getUserIDByEmail(this.userData.email).then((userID) => {
            if (userID) {
              this.userID = userID;
              // Get watchlist and display it
              this._FireStoreService.getWatchlist(this.userID).then((watchlist) => {
                this.watchList = watchlist;
                // console.log('Watchlist:', this.watchList);  // Debugging purpose
              });
            } else {
              console.log('User not found');
            }
          });
        }
      });
    }
  }



  
}
