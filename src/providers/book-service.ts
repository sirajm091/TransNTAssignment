import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the BookServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookServiceProvider {
	public BookList:any;
	currentUser: any;
	lat: any;
	lng: any;
	allCategories: any;
	allBooks: any;

  constructor(public platform: Platform, private geolocation: Geolocation) {
     platform.ready().then(() => {
        this.BookList = firebase.database().ref('/BookList');
        this.currentUser = firebase.auth().currentUser;
        console.log(this.BookList);
        this.geolocation.getCurrentPosition().then((resp) => {
          this.lat = resp.coords.latitude;
          this.lng = resp.coords.longitude;
	      }).catch((error) => {
	    });

    });
  }

  addBook(image_url: String, category:String, book_name: String, author: String, isbn: String, publish_date: String, added_date: String){
  	
	return this.BookList.child(isbn).set({
        bookname: book_name,
        author: author,
        isbn: isbn,
        publishDate: publish_date,
        addedDate: added_date,
        image: image_url,
        category: category,
        added_by: this.currentUser.uid,
        lattitude: this.lat,
        longitude: this.lng,
    });
  }

   getAllBooks() {
    return new Promise(resolve => {
      this.BookList.orderByChild('isbn').on('value', (snapshot) => {
        let bookdata = snapshot.val();
        let temparr = [];
        for (var key in bookdata) {
          console.log(key);
          bookdata[key].value = key;
          temparr.push(bookdata[key]);
        }
        resolve(temparr);
        console.log(temparr);
        this.allBooks = temparr;
      }, err => resolve(err));
    });
  }

  removeMyBook(isbn) {
    return new Promise(resolve => {
      this.BookList.child(isbn).remove();
      resolve(true);
    });
  }


}
