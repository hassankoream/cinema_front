import { Component, inject, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MoviesService } from '../../core/services/movies.service';
import { Icredit } from '../../core/interfaces/icredit';
import { ImDetails } from '../../core/interfaces/im-details';
import { CurrencyPipe, NgIf, NgFor, DatePipe, NgStyle } from '@angular/common';
import { IShow } from '../../core/interfaces/ishow';
import { IShowCredit } from '../../core/interfaces/i-show-credit';

@Component({
  selector: 'app-full-show-cast',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, NgIf, NgFor, DatePipe, NgStyle],
  templateUrl: './full-show-cast.component.html',
  styleUrl: './full-show-cast.component.css'
})
export class FullShowCastComponent {

  private readonly _MoviesService = inject(MoviesService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _Router = inject(Router)
  private readonly _Title = inject(Title)

  showID!: number;
  showType!: string;
  showDetails!: ImDetails;
  showCredits!: Icredit;
  castCredits: IShowCredit[] = [];
  crewCredits: IShowCredit[] = [];
  mainImageUrl: string = 'https://image.tmdb.org/t/p/w500';
  imageUrl!: string


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadCredits();


  }

  loadCredits() {



    this._ActivatedRoute.params.subscribe({
      next: (params) => {


        this.showID = params['id'];
        this.showType = params['type'];

        if (this.showType =='tv') {
          this._MoviesService.getShowCredits(this.showID, this.showType).subscribe({
            next: (res) => {
              this.showCredits = res;
              this.castCredits = res.cast;
              this.crewCredits = res.crew;
  
  
  
  
              // console.log('credits:', res);
  
            }
          });
        }
        else if (this.showType=='movie') {
          this._MoviesService.getMovieCredits(this.showID, this.showType).subscribe({
            next: (res) => {
              this.showCredits = res;
              this.castCredits = res.cast;
              this.crewCredits = res.crew;
  
  
  
  
              // console.log('credits:', res);
  
            }
          });
        }
       
   
        this._MoviesService.getShowDetails(this.showID, this.showType).subscribe({
          next: (res) => {
            // console.log('details:',res);
            this.showDetails = res;
            // Fetch the image through your proxy
            // if (this.showDetails.backdrop_path !== null) {
            //   this.imageUrl = `https://sdmcima-hassans-projects-07a19d68.vercel.app/image-proxy?url=${encodeURIComponent(this.mainImageUrl + this.showDetails.poster_path)}`;

            // }
            // // this.imageUrl = this.mainImageUrl + this.showDetails.backdrop_path;
            // this.loadAndExtractColor();

            this._Title.setTitle(((this.showDetails.name || this.showDetails.title) + '_' + 'cast&crew' + '_' + 'CinemaX'));


          }
        })

      }
    });


  }


  goBackToMain(mediaType: string, showId: number): void {
    this._Router.navigate(['/m/show-details', mediaType || 'show', showId]);
  }
  // extractedColor: string = 'rgba(150, 90, 40, 0.4)'; // Default color

  // @ViewChild('imageCanvas') imageCanvas!: any;


  // loadAndExtractColor() {
  //   const img = new Image();
  //   img.src = this.imageUrl;
  //   // console.log(this.imageUrl);


  //   img.crossOrigin = 'Anonymous'; // Needed for cross-origin images
  //   img.onload = () => {
  //     const canvas = this.imageCanvas.nativeElement;
  //     const ctx = canvas.getContext('2d', { willReadFrequently: true });

  //     canvas.width = img.width;
  //     canvas.height = img.height;

  //     // Draw the image on the canvas
  //     ctx.drawImage(img, 0, 0);

  //     const percentageX = 0.1; // 20% of the width
  //     const percentageY = 0.9; // 20% of the height

  //     // Calculate pixel coordinates based on canvas size
  //     const x = Math.floor(canvas.width * percentageX);
  //     const y = Math.floor(canvas.height * percentageY);
  //     const pixelData = ctx.getImageData(x, y, 1, 1).data;

  //     // Construct the RGBA color
  //     this.extractedColor = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3] / 255})`;
  //   };
  // }

}
