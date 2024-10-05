
export interface IUser {
	name: string;
	email: string;
	dateOfBirth: string;
	gender: string;
	photo: string;
	createdAt: string;
    watchlist: string[];         // List of show IDs in the watchlist
    favoriteShows: string[];     // List of favorite show IDs
    posts: IPost[];              // Array of posts by the user          // Array of reviews by the user
    likes: string[];  
}
  
  export interface IPost {
    id: string;
    content: string;
    createdAt: Date;
  }
  


  
  