import { Injectable, signal, WritableSignal } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
// import {Firestore, collection, addDoc, doc, deleteDoc, getDocs, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IPost, IUser } from '../interfaces/i-user';
import { IShow } from '../interfaces/ishow';
import { ImDetails } from '../interfaces/im-details';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {



  isInWatchlist: WritableSignal<boolean> = signal(false); // Track if the show is in the watchlist
  isInFavorites: WritableSignal<boolean> = signal(false); // Track if the show is in the Favorites


  // private dpPath= '/users/${userId}/watchlist';
  private dbPath = '/users';
  usersRef!: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath)
  }


  getAllUsers() {
    return this.usersRef;
  }


  async addUser(user: IUser) {

    return this.usersRef.push(user)
      .catch(error => {
        console.error('Error adding user:', error);
      });
  }

  async getUserIDByEmail(email: string): Promise<string | null> {
    try {
      const snapshot = await this.db.database.ref('/users').orderByChild('email').equalTo(email).once('value');

      if (snapshot.exists()) {
        const users = snapshot.val();
        const userID = Object.keys(users)[0];  // Get the first match's key, assuming emails are unique
        // console.log('Firebase userID:', userID);
        return userID;
      } else {
        console.log('No user found with the provided email.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching userID:', error);
      return null;
    }
  }


  // watchlist(bookmark)

  async addToWatchlist(userID: string, show: ImDetails): Promise<void> {
    try {
      // Reference to the user's watchlist in Firebase
      const watchlistRef = this.db.database.ref(`${this.dbPath}/${userID}/watchlist`);

      // Convert show.id to a string to use it as a Firebase key
      const showRef = watchlistRef.child(show.id.toString()); // Convert the id to a string
      const snapshot = await showRef.once('value');

      if (!snapshot.exists()) {
        // Add the show to the watchlist
        await showRef.set(show);
        this.isInWatchlist.set(true);
        // console.log('Show added to watchlist');
      } else {
        // If the show already exists, remove it from the watchlist
        await this.removeFromWatchlist(userID, show.id.toString());
        this.isInWatchlist.set(false);
        // console.log('Show removed from watchlist');
      }
    } catch (error) {
      console.error('Error adding show to watchlist:', error);
    }
  }

  async checkIfInWatchlist(userID: string, showID: string): Promise<boolean> {
    try {


      const watchlistRef = this.db.database.ref(`${this.dbPath}/${userID}/watchlist/${showID}`);
      const snapshot = await watchlistRef.once('value');


      return snapshot.exists(); // Return true if the show is in the watchlist
    } catch (error) {
      console.error('Error checking watchlist status:', error);
      return false; // Return false in case of an error
    }
  }


  // // Remove movie from watchlist
  async removeFromWatchlist(userID: string, showID: string): Promise<void> {
    try {
      // Reference to the user's watchlist in Firebase
      const watchlistRef = this.db.database.ref(`${this.dbPath}/${userID}/watchlist`);

      // Remove the show from the watchlist
      await watchlistRef.child(showID).remove();
      // console.log('Show removed from watchlist successfully');
    } catch (error) {
      console.error('Error removing show from watchlist:', error);
    }
  }

  // Get watchlist for a user
  async getWatchlist(userID: string): Promise<ImDetails[]> {
    try {
      // Reference to the user's watchlist in Firebase
      const watchlistRef = this.db.database.ref(`${this.dbPath}/${userID}/watchlist`);

      // Retrieve the watchlist snapshot from Firebase
      const snapshot = await watchlistRef.once('value');

      // Assuming the structure of your watchlist items is an object with show IDs as keys
      const watchlist: { [key: string]: ImDetails } = snapshot.val() || {};

      // Convert the object into an array of ImDetails (list of shows)
      return Object.values(watchlist);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      return []; // Return an empty array in case of an error
    }
  }



  // favorites


  async addToFavorites(userID: string, show: ImDetails): Promise<void> {
    try {
      // Reference to the user's favorites in Firebase
      const favoritesRef = this.db.database.ref(`${this.dbPath}/${userID}/favoriteShows`);

      // Convert show.id to a string to use it as a Firebase key
      const showRef = favoritesRef.child(show.id.toString());
      const snapshot = await showRef.once('value');

      if (!snapshot.exists()) {
        // Add the show to the favorite list
        await showRef.set(show);
        this.isInFavorites.set(true);
        // console.log('Show added to favorites');
      } else {
        // If the show already exists, remove it from the favorites list
        await this.removeFromFavorites(userID, show.id.toString());
        this.isInFavorites.set(false);
        // console.log('Show removed from favorites');
      }
    } catch (error) {
      console.error('Error adding show to favorites:', error);
    }
  }

  // Remove movie from favorites
  async removeFromFavorites(userID: string, showID: string): Promise<void> {
    try {
      // Reference to the user's favorite shows in Firebase
      const favoritesRef = this.db.database.ref(`${this.dbPath}/${userID}/favoriteShows`);

      // Remove the show from the favorites list
      await favoritesRef.child(showID).remove();
      // console.log('Show removed from favorites successfully');
    } catch (error) {
      console.error('Error removing show from favorites:', error);
    }
  }

  async checkIfInFavorites(userID: string, showID: string): Promise<boolean> {
    try {
      // Reference to the user's favorite shows in Firebase
      const favoritesRef = this.db.database.ref(`${this.dbPath}/${userID}/favoriteShows/${showID}`);
      const snapshot = await favoritesRef.once('value');

      return snapshot.exists(); // Return true if the show is in the favorites
    } catch (error) {
      console.error('Error checking favorites status:', error);
      return false; // Return false in case of an error
    }
  }

  // Get favorites list for a user
  async getFavorites(userID: string): Promise<ImDetails[]> {
    try {
      // Reference to the user's favorite shows in Firebase
      const favoritesRef = this.db.database.ref(`${this.dbPath}/${userID}/favoriteShows`);

      // Retrieve the favorite shows snapshot from Firebase
      const snapshot = await favoritesRef.once('value');

      // Assuming the structure of your favorite shows items is an object with show IDs as keys
      const favorites: { [key: string]: ImDetails } = snapshot.val() || {};

      // Convert the object into an array of ImDetails (list of favorite shows)
      return Object.values(favorites);
    } catch (error) {
      console.error('Error fetching favorite shows:', error);
      return []; // Return an empty array in case of an error
    }
  }



  // Add a post
  addPost(userID: string, post: IPost) {
    return this.usersRef.update(userID, {
      posts: this.db.database.ref(`${this.dbPath}/${userID}/posts`).push(post)
    });
  }

  // Add a review
  // addReview(userID: string, review: IReview) {
  //   return this.usersRef.update(userID, {
  //     reviews: this.db.database.ref(`${this.dbPath}/${userID}/reviews`).push(review)
  //   });
  // }

  // Add a like
  addLike(userID: string, showId: string) {
    return this.usersRef.update(userID, {
      likes: this.db.database.ref(`${this.dbPath}/${userID}/likes`).push(showId)
    });
  }








}
