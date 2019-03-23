import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BooksPage } from '../books/books';

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {

  constructor(public navCtrl: NavController) {

  }

  getBooks(category){
  	 this.navCtrl.push(BooksPage, category);
  }

}
