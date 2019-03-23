import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import  firebase from 'firebase';
import { BookServiceProvider } from '../../providers/book-service';
import { BookDetailsPage } from '../book-details/book-details';
import { EditBookPage } from '../edit-book/edit-book';

@Component({
  selector: 'page-my-books',
  templateUrl: 'my-books.html',
})
export class MyBooksPage {
  
  booksCount: any;
  myBooks: any;
  currentUser: any;
  disableSubmit: boolean = false;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public service: BookServiceProvider, public toastCtrl: ToastController) {
  }

  ionViewDidEnter() {
  	this.currentUser = firebase.auth().currentUser;
  	this.myBooks = [];
    this.booksCount = Object.keys(this.service.allBooks).length;
    console.log(this.service.allBooks);
    if(this.booksCount != 0){
    	for(let item in this.service.allBooks){
    		if(this.service.allBooks[item].added_by == this.currentUser.uid){
    			this.myBooks.push(this.service.allBooks[item]);
    		}
    	}
    }
  }

  remove(isbn){
  	    this.disableSubmit = true;
  		this.service.removeMyBook(isbn)
  			.then((results) => this.handleResults(results));
  }

  handleResults(results){
    this.service.getAllBooks()
    	.then((results) => this.handleAllResults(results));
  }


  handleAllResults(results){
  	  this.disableSubmit = false;
  	  this.presentToastAlert('Book has been deleted');
	  this.myBooks = [];
	    this.booksCount = Object.keys(this.service.allBooks).length;
	    console.log(this.service.allBooks);
	    if(this.booksCount != 0){
	    	for(let item in this.service.allBooks){
	    		if(this.service.allBooks[item].added_by == this.currentUser.uid){
	    			this.myBooks.push(this.service.allBooks[item]);
	    		}
	    	}
	    }
	}

  presentToastAlert(alert) {
      let toast = this.toastCtrl.create({
          message: alert,
          duration: 2000,
           position: 'top'
      });
      toast.present();
  }

  gotoBook(item){
    let modal1 = this.modalCtrl.create(BookDetailsPage, item);
        modal1.present();
  }

  edit(item){
    this.navCtrl.push(EditBookPage, item);
  }

}
