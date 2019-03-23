import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Auth } from '../../../providers/auth';
import { TabsPage } from '../../tabs/tabs';
import { RegisterPage } from '../register/register';
import { NativeStorage } from '@ionic-native/native-storage';
import  firebase from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
	form: any = {};
	disableLogin: boolean = false;
  showPasswordEnable: boolean = false;
  disableSubmit: boolean = false;
  LogIn = "Login";
  lan: any = {};
  currentUser: any;
  user:any;

  constructor(public toastCtrl: ToastController, public auth: Auth, public nav: NavController, private nativeStorage: NativeStorage) {
    //this.form.password = 'test123';
    //this.form.email = 'test@gmail.com';
    //this.login();
  }

  signup(){
    this.nav.push(RegisterPage);
  }

  login(){
    if(this.validate()){
      this.disableSubmit = true;
      this.LogIn = "Please wait";
        this.auth.login(this.form.email, this.form.password).then((success) =>{
          this.disableSubmit = false;
          this.LogIn = "Login";
          this.auth.isLoggedIn = true;
          this.currentUser = firebase.auth().currentUser;
          console.log(this.currentUser)
          if(this.currentUser){
            this.auth.getUserProfile(this.currentUser.uid).on('value', (snapshot) =>{
             this.user = snapshot.val();
             this.auth.role = this.user.role;
             console.log(this.user);
            });
          }

          this.nativeStorage.setItem('loginData', {
              username: this.form.email,
              password: this.form.password
          }).then(data => console.log('Login Details Stored'), error => console.error(error));
          
          this.nav.setRoot(TabsPage);
        }).catch(err => {
          this.disableSubmit = false;
          this.LogIn = "Login";
          this.handleError(err);
      });
      }
  }

  handleError(err){
        console.log(err.code);
        this.disableSubmit = false;
        if(err.code){
            this.presentToastAlert(err.message);
        }
  }

  validate(){
    if(this.form.email == undefined || this.form.email == ''){
      this.presentToastAlert('Please enter email');
      return false;
    }
    if(this.form.password == undefined || this.form.password == ''){
      this.presentToastAlert('Please enter password');
      return false;
    }
    return true;
  }

  presentToastAlert(alert) {
      let toast = this.toastCtrl.create({
          message: alert,
          duration: 2000,
           position: 'top'
      });
      toast.present();
  }

  showPassword(){
    this.showPasswordEnable = true; 
  }
  
  hidePassword(){
    this.showPasswordEnable = false; 
  }

}
