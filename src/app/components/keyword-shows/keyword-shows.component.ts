import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MoviesService } from '../../core/services/movies.service';
import { NetworkDetails } from '../../core/interfaces/im-details';
import { NgFor, NgIf } from '@angular/common';
import { IShow } from '../../core/interfaces/ishow';
import { ProgressCircleComponent } from "../progress-circle/progress-circle.component";
import { FormatTitlePipe } from '../../core/pipes/format-title.pipe';
import { PercentagePipe } from '../../core/pipes/percentage.pipe';
import { SplitTitlePipe } from '../../core/pipes/split-title.pipe';


@Component({
  selector: 'app-keyword-shows',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, ProgressCircleComponent, FormatTitlePipe, PercentagePipe, SplitTitlePipe],
  templateUrl: './keyword-shows.component.html',
  styleUrl: './keyword-shows.component.css'
})
export class KeywordShowsComponent {

  private readonly _MoviesService = inject(MoviesService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _Title = inject(Title);

  keyword_name!:string;
  mainImageUrl: string = 'https://image.tmdb.org/t/p/w500';
  showType!: string;
  showList!:IShow[];



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._ActivatedRoute.params.subscribe({
      next:(params)=>{
        this.keyword_name = params['name'];
        this.showType = params['show_type'];
        // console.log(this.keyword_name, this.showType);
        
        this._MoviesService.getKeywordDetails(this.keyword_name, this.showType).subscribe({
          next:(res)=>{
            // this.networkDetails = res;
            // console.log(res);
            this.showList= res.results;
            // this._Title.setTitle(((this.networkDetails.name) +' - ' + 'CinemaX'));


          }
        })
      }
    })


  }

}
