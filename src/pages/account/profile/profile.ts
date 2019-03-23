import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import  firebase from 'firebase';
import { Auth } from '../../../providers/auth'
import { EditProfilePage } from '../edit-profile/edit-profile';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';
import { LoginPage } from '../login/login';
import { NativeStorage } from '@ionic-native/native-storage';

declare var cordova: any;

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  
  currentUser: any;
  profile:any;
  UserList: any;
  user:any;
  language: any;
 
  constructor(public platform: Platform, private nativeStorage: NativeStorage, private callNumber: CallNumber, private emailComposer: EmailComposer, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public auth: Auth) {
  }

    ionViewWillEnter() {
     	  this.currentUser = firebase.auth().currentUser;
      	console.log(this.currentUser)
      	if(this.currentUser){
       	  this.auth.getUserProfile(this.currentUser.uid).on('value', (snapshot) =>{
           this.user = snapshot.val();
           console.log(this.user);
          });
        }
    }

    edit(){
      let modal = this.modalCtrl.create(EditProfilePage, this.user);
          modal.present();
    }

    contact() {
        let email = {
            to: 'siraj.m717@gmail.com',
            subject: '',
            body: '',
            isHtml: true
        };
        this.emailComposer.open(email);
    }

    call(){
      this.callNumber.callNumber('7760573437', true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
    }

    logout(){
        this.auth.logoutUser().then(() => {
        this.navCtrl.parent.select(0);
        this.auth.isLoggedIn = false;
        this.nativeStorage.remove('loginData');
        let modal = this.modalCtrl.create(LoginPage);
        modal.present();
        });;
    }

    login(){
      let modal = this.modalCtrl.create(LoginPage);
        modal.present();
    }
}
