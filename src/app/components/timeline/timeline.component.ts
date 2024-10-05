import { Component, inject, signal, WritableSignal, OnInit } from '@angular/core';
import { PostsService } from '../../core/services/posts.service';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { CommentsComponent } from "../../shared/ui/comments/comments.component";
import { IPost } from '../../core/interfaces/ipost';
import { ArrowtopComponent } from "../../shared/monocompo/arrowtop/arrowtop.component";
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [DatePipe, NgIf, CommentsComponent, ArrowtopComponent, InfiniteScrollDirective, FormsModule, NgClass],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {


  private readonly _PostsService = inject(PostsService)


  // postsList:IPost[]=[]
  postsList:WritableSignal<IPost[]> = signal([])
  isLoading:boolean = true
  lastPage:number = 28
  savedFile!:File | null
  content!:string
  isFileOver: boolean = false;
  previewUrl: any;
  msgError!:string;


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
      next:(res)=>{
        
        // console.log('1st',res);
        
        // this.postsList.set(this.postsList().concat(res.posts.reverse()));
        // this.isLoading = false
        this.currentPage.set(res.paginationInfo.numberOfPages)
        // console.log(this.currentPage());
        
        this._PostsService.getLimitedPosts(this.currentPage()).subscribe({
          next:(res)=>{
            
            // console.log('2nd',res);
            
            this.postsList.set(res.posts.reverse());
            this.isLoading = false
            this.currentPage.set(res.paginationInfo.numberOfPages-1)
            // console.log(this.currentPage());
           
          },
          error:(err)=>{
            console.error('Error fetching posts:', err);
            
          }
        })
        // console.log(this.currentPage());
       
      },
      error:(err)=>{
        console.error('Error fetching posts:', err);
        
      }
    })
  



  }



  onScroll() {
    if(this.currentPage() > 1){
// let currentPage = 2
    // console.log(this.currentPage());
    this._PostsService.getLimitedPosts(this.currentPage()).subscribe({
      next:(res)=>{
        // console.log(res, this.currentPage());
        //  get the latest posts
        // reverse the pages
         // Append the latest posts to the postsList
         this.postsList.set(this.postsList().concat(res.posts.reverse()));
        //  this.postsList = this.postsList.concat(res.posts);
        


      },
      error: (err) => {
        console.error('Error fetching posts:', err);
      },
      
    });
    this.currentPage.update(value => value - 1); // Increment page number after successful fetch
    }
    
  }


 
  getImage(e: Event){
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length>0) {

      this.savedFile = input.files[0]
      this.previewFile(this.savedFile);  // Preview the file
      
    } 
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();  // Prevent the default behavior (file open in browser)
    this.isFileOver = true;  // Show visual feedback
  }

  // Handle when the file is dragged away from the drop zone
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isFileOver = false;  // Remove the visual feedback
  }

  // Handle when the file is dropped into the drop zone
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isFileOver = false;  // Remove the visual feedback

    // Retrieve the dropped file(s)
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.savedFile = event.dataTransfer.files[0];  // Get the first dropped file
      // console.log('File dropped:', this.savedFile);
      // You can add further logic here to preview the file or upload it.
      this.previewFile(this.savedFile);  // Preview the file
    }
  }
   // Preview the selected or dropped file
   previewFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.previewUrl = e.target?.result;  // Set the preview URL
    };
    reader.readAsDataURL(file);  // Read the file as a data URL
  }


   // Remove the file and clear the preview and clear
   removeFile() {
    this.savedFile = null;
    this.previewUrl = null;
    const fileInput = document.getElementById('dropzone-file') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';  // Clear the input value
    }
  }

  // Close the modal and hide it
  closeModal() {
    const modal = document.getElementById('authentication-modal');
    if (modal) {

      modal.classList.add('hidden'); // Add the hidden class
      modal.classList.remove('flex'); // Remove the flex class
      // modal.setAttribute('aria-hidden', 'true'); // Update aria-hidden  // Ensure the modal is not displayed
    }
  }
   // Show the modal by removing the hidden class and adding flex
   showModal() {
    const modal = document.getElementById('authentication-modal');
    if (modal) {
      modal.classList.remove('hidden'); // Remove the hidden class
      modal.classList.add('flex'); // Add the flex class
      // modal.setAttribute('aria-hidden', 'false'); // Update aria-hidden
    }
  }

  createPost(): void {
    const _formData = new FormData();
  
    // Check if 'content' (body) is provided
    if (!this.content || this.content.trim() === '') {
      this.msgError = 'Post content is required'
      // console.error();
      return;// Exit the function, don't proceed further
    }
  
    // Check if 'image' is provided and valid (if required)
    if (!this.savedFile) {
      // console.error();
      this.msgError = 'Image is required'

      return;// Exit the function, don't proceed further
    } else {
      const allowedFileTypes = ['image/png', 'image/jpeg', 'image/svg'];
      const maxFileSize = 4 * 1024 * 1024; // 4MB
  
      // // Check file type
      if (!allowedFileTypes.includes(this.savedFile.type)) {
        
        this.msgError = 'Invalid file type. Only PNG and JPEG are allowed.';
        return;
      }
  
      // Check file size
      if (this.savedFile.size > maxFileSize) {
        // console.error();
        this.msgError = `File size exceeds the 4MB limit`
        return;// Exit the function, don't proceed further
      }
    }
  
    // Append the form data
    _formData.append('body', this.content);
    _formData.append('image', this.savedFile);
  
    // Call the API
    this._PostsService.createPost(_formData).subscribe({
      next: (res) => {
        if (res.message == "success") {

          // this.msgError = 'success';
         this.ngOnInit();
         this.removeFile();
         this.content = '';
        
         this.closeModal();  // Hide the modal after success

          
        }
        
      },
      error: (err) => {
        this.msgError = 'try smaller image'
        console.error('Error creating post:', err);
      }
    });



  }
  

}
