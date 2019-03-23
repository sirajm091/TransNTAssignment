import { Component } from '@angular/core';
import { NavController, NavParams, ViewController  } from 'ionic-angular';

@Component({
  selector: 'page-book-details',
  templateUrl: 'book-details.html',
})
export class BookDetailsPage {

	bookDetails: any;

  constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController) {
  	this.bookDetails = params.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookDetailsPage');
  }

  close(){
  	this.viewCtrl.dismiss();
  }

}
