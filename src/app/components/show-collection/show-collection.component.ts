import { Component, inject, ViewChild } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { ProgressCircleComponent } from "../progress-circle/progress-circle.component";
import { PercentagePipe } from '../../core/pipes/percentage.pipe';
import { SplitTitlePipe } from '../../core/pipes/split-title.pipe';
import { environment } from '../../core/environments/environment';


@Component({
  selector: 'app-show-collection',
  standalone: true,
  imports: [NgStyle, NgIf, NgFor, DatePipe, ProgressCircleComponent, RouterLink, PercentagePipe, SplitTitlePipe],
  templateUrl: './show-collection.component.html',
  styleUrl: './show-collection.component.css'
})
export class ShowCollectionComponent {


  private readonly _MoviesService = inject(MoviesService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _Router = inject(Router);


  collectionID!: number;
  mainImageUrl: string = 'https://image.tmdb.org/t/p/w500'
  collectionDetails:any;
  imageUrl!: string



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadShowCollection();
  }


  loadShowCollection(): void {


    this._ActivatedRoute.params.subscribe({
      next: (params) => {
        this.collectionID = params['CollectionId'];
        // this.showType = params['type'];
        // this.currentStep = 0;

        this._MoviesService.getCollection(this.collectionID).subscribe({
          next: (res) => {
            // this.showRelated = res.results
            this.collectionDetails = res
            // console.log('collection:',res);
            if(this.collectionDetails.poster_path !== null){
              this.imageUrl = `${environment.backendUrl}/image-proxy?url=${encodeURIComponent(this.mainImageUrl + this.collectionDetails.backdrop_path)}`;

            }
            this.loadAndExtractColor();

          }
          
        });
      }
    });

    


  }

  extractedColor: string = 'rgba(150, 90, 40, 0.4)'; // Default color

  @ViewChild('imageCanvas') imageCanvas!: any;


  loadAndExtractColor() {
    const img = new Image();
    img.src = this.imageUrl;
    // console.log(this.imageUrl);


    img.crossOrigin = 'Anonymous'; // Needed for cross-origin images
    img.onload = () => {
      const canvas = this.imageCanvas.nativeElement;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0);

      const percentageX = 0.5; // 20% of the width
      const percentageY = 0.5; // 20% of the height
      
      // Calculate pixel coordinates based on canvas size
      const x = Math.floor(canvas.width * percentageX);
      const y = Math.floor(canvas.height * percentageY);
      const pixelData = ctx.getImageData(x, y, 1, 1).data;

      // Construct the RGBA color
      this.extractedColor = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3] / 255})`;
    };
  }




}
