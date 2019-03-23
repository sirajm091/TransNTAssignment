import { Component} from '@angular/core';
import { Auth } from '../../providers/auth';
import { AddBook } from '../add-book/add-book';
import { Events, NavController, ModalController } from 'ionic-angular';
import { BookServiceProvider } from '../../providers/book-service';
import { MapPage } from '../map/map';
import { BookDetailsPage } from '../book-details/book-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  booksCount: any;
  item: any;
 
  constructor(public nav: NavController, public auth: Auth, public events: Events, public service: BookServiceProvider, public modalCtrl: ModalController) {

  }

  ionViewDidEnter() {
    console.log('Page loaded');
    this.service.getAllBooks()
    	.then((results) => this.handleResults(results));
  }

  handleResults(results){
  	this.booksCount = Object.keys(this.service.allBooks).length;
  	console.log(this.booksCount);
  }

  addBooks(){
  	this.nav.push(AddBook);
  }

  location(lat, lng){
  	   this.item = [];
  	   this.item.lat = lat;
  	   this.item.lng = lng;
       this.nav.push(MapPage, this.item);
  }

  gotoBook(item){
  	let modal1 = this.modalCtrl.create(BookDetailsPage, item);
        modal1.present();
  }

}
