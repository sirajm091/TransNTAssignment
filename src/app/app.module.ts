import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AddBook } from '../pages/add-book/add-book';
import { CategoriesPage } from '../pages/categories/categories';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from '../pages/map/map';
import { BookDetailsPage } from '../pages/book-details/book-details';
import { BooksPage } from '../pages/books/books';
import { MyBooksPage } from '../pages/my-books/my-books';
import { EditBookPage } from '../pages/edit-book/edit-book';


import { EditProfilePage } from '../pages/account/edit-profile/edit-profile';
import { LoginPage } from '../pages/account/login/login';
import { ProfilePage } from '../pages/account/profile/profile';
import { RegisterPage } from '../pages/account/register/register';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeStorage } from '@ionic-native/native-storage';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Network } from '@ionic-native/network';

import { Auth } from '../providers/auth';
import { BookServiceProvider } from '../providers/book-service';
import { Functions } from '../providers/functions';



@NgModule({
  declarations: [
    MyApp,
    AddBook,
    CategoriesPage,
    HomePage,
    TabsPage,
    EditProfilePage,
    LoginPage,
    ProfilePage,
    RegisterPage,
    MapPage,
    BookDetailsPage,
    BooksPage,
    MyBooksPage,
    EditBookPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddBook,
    CategoriesPage,
    HomePage,
    TabsPage,
    EditProfilePage,
    LoginPage,
    ProfilePage,
    RegisterPage,
    MapPage,
    BookDetailsPage,
    BooksPage,
    MyBooksPage,
    EditBookPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeStorage,
    CallNumber,
    EmailComposer,
    Auth,
    Network,
    Camera,
    Functions,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BookServiceProvider,
  ]
})
export class AppModule {}
