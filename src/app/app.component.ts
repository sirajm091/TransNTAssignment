import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/account/login/login';
import { NativeStorage } from '@ionic-native/native-storage';
import { Auth } from '../providers/auth';
import { AddBook } from '../pages/add-book/add-book';
import { Network } from '@ionic-native/network';
import { Functions } from '../providers/functions';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  currentUser: any;
  loading: any;
  user: any;

  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, private network: Network, public functions: Functions, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private nativeStorage: NativeStorage, public auth: Auth) {
    
    firebase.initializeApp({
      apiKey: "AIzaSyDMtsW43RjBFFI93nAxGSLy79erYKFPDw8",
      authDomain: "transnt-db062.firebaseapp.com",
      databaseURL: "https://transnt-db062.firebaseio.com",
      projectId: "transnt-db062",
      storageBucket: "transnt-db062.appspot.com",
      messagingSenderId: "476774210689"
    });

    platform.ready().then(() => {
      
      this.network.onDisconnect().subscribe(() => {
          let alert = this.alertCtrl.create({
              title: 'No Internet!',
              subTitle: 'Oops! Looks like your internet connection is not working. Please ensure your phone is connected to the internet',
              buttons: ['OK'],
              enableBackdropDismiss: false
          });
          alert.present();
      });

        this.nativeStorage.getItem('loginData')
          .then(data => {
            if(data){
                  this.loading = this.loadingCtrl.create({
                    content: "Please wait...",
                  });
                  this.loading.present();

                  this.auth.login(data.username, data.password).then((success) =>{
                  this.auth.isLoggedIn = true;
                  this.currentUser = firebase.auth().currentUser;
                  if(this.currentUser){
                    this.auth.getUserProfile(this.currentUser.uid).on('value', (snapshot) =>{
                     this.user = snapshot.val();
                     this.auth.role = this.user.role;
                     console.log(this.user);
                    });
                  }
                  this.loading.dismiss();
                  this.nav.setRoot(TabsPage);
                }).catch(err => {
                  this.loading.dismiss();
                  this.nav.setRoot(LoginPage);
                  });
              }
            }
            , error => this.nav.setRoot(LoginPage));  
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
