import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { CommentsService } from '../../../core/services/comments.service';
import { IComment } from '../../../core/interfaces/icomment';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [DatePipe, NgIf, NgFor, FormsModule, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {


  private readonly _CommentsService = inject(CommentsService)


  @Input() commentsList: IComment[] = [];
  @Input( {required : true}) postId!:string;
  // content!:string;
  commentGroup!: FormGroup

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._CommentsService.getPostComments(this.postId).subscribe({
      next:(res)=>{
      //  console.log('hello from comments');
       
        this.commentsList = res.comments
        
      }
    })
    // created here because @input will not get the postID, make it global to initial type for it.
    this.commentGroup = new FormGroup({
      content: new FormControl(null),
      post: new FormControl(this.postId)
    })
  }

  //  using form group

  sendComment(){
    
    this._CommentsService.createComment(this.commentGroup.value).subscribe({
          next: (res) => {
            // console.log('Comment created successfully:', res);
            // this.commentsList = res.comments
            this.commentsList = res.comments.reverse();
            this.commentGroup.get('content')?.reset();
           
          },
    });
  }
 

  //  using ng model
  //  [(ngModel)]="content"
  // content!:string;
  // createComment() {
  //   // Check if content is not empty
  //   if (!this.content || this.content.trim() === '') {
  //     console.error('Content is required to submit a comment.');
  //     return;
  //   }
  
  //   // Check if postId is available
  //   if (!this.postId) {
  //     console.error('Post ID is required.');
  //     return;
  //   }
  
  //   // Data to be sent to the API
  //   let data = {
  //     "content": this.content,
  //     "post": this.postId
  //   };
  
  //   // Call the service to create a comment
  //   this._CommentsService.createComment(data).subscribe({
  //     next: (res) => {
  //       console.log('Comment created successfully:', res);
  //       this.commentsList = res.comments
  //       // Optionally clear the comment input
  //       this.content = ''; 
  //     },
  //     error: (err) => {
  //       console.error('Error creating comment:', err);
  //     },
  //     complete: () => {
  //       console.log('Comment submission completed.');
  //     }
  //   });
  // }
  
}
