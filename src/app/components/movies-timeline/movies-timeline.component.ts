import { Component, inject, signal, WritableSignal, OnInit } from '@angular/core';
import { PostsService } from '../../core/services/posts.service';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { CommentsComponent } from "../../shared/ui/comments/comments.component";
import { IPost } from '../../core/interfaces/ipost';
import { ArrowtopComponent } from "../../shared/monocompo/arrowtop/arrowtop.component";
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import { MoviesPostsPipe } from '../../core/pipes/movies-posts.pipe';
import { ExtractImageUrlPipe } from '../../core/pipes/extract-image-url.pipe';
import { ExtractPostBodyPipe } from '../../core/pipes/extract-post-body.pipe';

@Component({
  selector: 'app-movies-timeline',
  standalone: true,
  imports: [ExtractImageUrlPipe,ExtractPostBodyPipe,DatePipe, NgIf, CommentsComponent, ArrowtopComponent, InfiniteScrollDirective, FormsModule, NgClass, MoviesPostsPipe],
  templateUrl: './movies-timeline.component.html',
  styleUrl: './movies-timeline.component.css'
})



export class MoviesTimelineComponent {

  private readonly _PostsService = inject(PostsService)


  // postsList:IPost[]=[]
  postsList: WritableSignal<IPost[]> = signal([])
  isLoading: boolean = true
  lastPage: number = 28
  savedFile!: File | null
  content!: string
  isFileOver: boolean = false;
  previewUrl: any;
  msgError!: string;


  // currentPage: number = 1;
  currentPage: WritableSignal<number> = signal(1);


  // getPosts(page?:number){
  //   this._PostsService.getLimitedPosts(page).subscribe({
  //     next:(res)=>{


  //       this.postsList.set(this.postsList().concat(res.posts.reverse()));

  //       // console.log(this.currentPage());

  //     },
  //     error:(err)=>{
  //       console.error('Error fetching posts:', err);

  //     }
  //   })
  // }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    // console.log(this._PostsService.getLastPage());

    this._PostsService.getLimitedPosts().subscribe({
      next: (res) => {

        // console.log('1st', res);

        // this.postsList.set(this.postsList().concat(res.posts.reverse()));
        // this.isLoading = false
        this.currentPage.set(res.paginationInfo.numberOfPages)
        // console.log(this.currentPage());

        this._PostsService.getLimitedPosts(this.currentPage()).subscribe({
          next: (res) => {
            // Filter posts where the body starts with 'ms,'
            const filteredPosts = res.posts.filter((post: any) => 
              post.body && typeof post.body === 'string' && post.body.startsWith('ms,')
            );
            if (filteredPosts.length > 0) {
              // Assign the filtered and reversed array to postsList if there are posts
              this.postsList.set(filteredPosts.reverse());
            } else {
              // Handle the case where no posts match the criteria
              this.postsList.set([]); // Or show a message instead
              console.log('No posts found');
            }

            // Assign the filtered and reversed array to postsList
            // this.postsList.set(filteredPosts.reverse());
            this.isLoading = false
            this.currentPage.set(res.paginationInfo.numberOfPages - 1)
            // console.log(this.currentPage());

          },
          error: (err) => {
            console.error('Error fetching posts:', err);

          }
        })
        // console.log(this.currentPage());

      },
      error: (err) => {
        console.error('Error fetching posts:', err);

      }
    })




  }



  onScroll() {
    if (this.currentPage() > 1) {
      // let currentPage = 2
      // console.log(this.currentPage());
      this._PostsService.getLimitedPosts(this.currentPage()).subscribe({
        next: (res) => {
          // console.log(res, this.currentPage());
          //  get the latest posts
          // reverse the pages
          // Append the latest posts to the postsList
               // Filter posts where the body starts with 'ms,'
               const filteredPosts = res.posts.filter((post: any) => 
                post.body && typeof post.body === 'string' && post.body.startsWith('ms,')
              );
               if (filteredPosts.length > 0) {
                // Assign the filtered and reversed array to postsList if there are posts
                this.postsList.set(this.postsList().concat(filteredPosts.reverse()));
              } else {
                // Handle the case where no posts match the criteria
                // this.postsList.set([]); // Or show a message instead
                // console.log('No posts found');
                return;
              }

               // Assign the filtered and reversed array to postsList
              //  this.postsList.set(filteredPosts.reverse());
          // this.postsList.set(this.postsList().concat(filteredPosts.reverse()));
          //  this.postsList = this.postsList.concat(res.posts);



        },
        error: (err) => {
          console.error('Error fetching posts:', err);
        },

      });
      this.currentPage.update(value => value - 1); // Increment page number after successful fetch
    }

  }














}
