import { Component } from '@angular/core';

import { CategoriesPage } from '../categories/categories';
import { HomePage } from '../home/home';
import { ProfilePage } from '../account/profile/profile';
import { Auth } from '../../providers/auth';
import { MyBooksPage } from '../my-books/my-books';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CategoriesPage;
  tab3Root = ProfilePage;
  tab4Root = MyBooksPage;

  constructor(public auth: Auth) {

  }
}
