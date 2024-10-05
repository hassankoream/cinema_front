import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../core/services/movies.service';
import { NetworkDetails } from '../../core/interfaces/im-details';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-network-details',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './network-details.component.html',
  styleUrl: './network-details.component.css'
})
export class NetworkDetailsComponent {

  private readonly _MoviesService = inject(MoviesService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _Title = inject(Title);

  network_id!:number;
  mainImageUrl: string = 'https://image.tmdb.org/t/p/w500';

  networkDetails!:NetworkDetails;


  
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this._ActivatedRoute.params.subscribe({
        next:(params)=>{
          this.network_id = params['id'];
          this._MoviesService.getNetworkDetails(this.network_id).subscribe({
            next:(res)=>{
              this.networkDetails = res;
              // console.log(res);
              this._Title.setTitle(((this.networkDetails.name) +' - ' + 'CinemaX'));


            }
          })
        }
      })
    }

}
