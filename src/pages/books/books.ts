import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { BookServiceProvider } from '../../providers/book-service';
import { BookDetailsPage } from '../book-details/book-details';

@Component({
  selector: 'page-books',
  templateUrl: 'books.html',
})
export class BooksPage {

  booksCount: any;
  category: any;
  categoryBooks: any;

  constructor(public navCtrl: NavController, public params: NavParams, public service: BookServiceProvider, public modalCtrl: ModalController) {
  	this.category = params.data;
    console.log(this.category);
  }

  ionViewDidLoad() {
  	this.categoryBooks = [];
    console.log('ionViewDidLoad BooksPage');
    this.booksCount = Object.keys(this.service.allBooks).length;
    if(this.booksCount != 0){
    	for(let item in this.service.allBooks){
    		if(this.service.allBooks[item].category.match(this.category)){
    			this.categoryBooks.push(this.service.allBooks[item]);
    		}
    	}
    }
  }

  gotoBook(item){
    let modal1 = this.modalCtrl.create(BookDetailsPage, item);
        modal1.present();
  }

}
