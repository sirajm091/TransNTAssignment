import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Auth } from '../../../providers/auth';
import firebase from 'firebase';
import { TabsPage } from '../../tabs/tabs';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

	form: any = {};
	disableRegister: boolean = false;
  customerList: any;
  lan: any = {};

  constructor(public auth: Auth, public toastCtrl: ToastController, public nav: NavController) {
    	this.auth = auth;
    	this.customerList = firebase.database().ref('/User-List');
  }

  register() {
      if(this.validateRegister()){
          this.disableRegister = true;
          this.auth.register(this.form.firstname, this.form.lastname, this.form.email, this.form.password, this.form.phone)
              .then(() => {
                this.disableRegister = false;
                this.nav.setRoot(TabsPage);
                this.presentToastAlert('Success');
              }).catch(err => {
                this.disableRegister = false;
                this.handleRegisterError(err);
                });
      } 
  }

  handleRegisterError(err){
      this.disableRegister = false;
      if(err.code){
          this.presentToastAlert(err.message);
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

  validateRegister(){
  
    if(this.form.firstname == undefined || this.form.firstname == ''){
      this.presentToastAlert('Firstname is required');
      return false;
    }

    if(this.form.lastname == undefined || this.form.lastname == ''){
      this.presentToastAlert('Lastname is required');
      return false;
    }

    if(this.form.email == undefined || this.form.email == ''){
      this.presentToastAlert('Email is required');
      return false;
    }

    if(this.form.email){
      var serchfind:boolean;
      var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      serchfind = regexp.test(this.form.email);
      console.log(serchfind);
      if(!serchfind){
        this.presentToastAlert('Invalid Email');
        return false;
      }
    }

    if(this.form.password == undefined || this.form.password == ''){
      this.presentToastAlert('Password is required');
      return false;
    }

    if(this.form.confirm_password == undefined || this.form.confirm_password == ''){
      this.presentToastAlert('Please confirm password');
      return false;
    }

    if(this.form.password != this.form.confirm_password){
      this.presentToastAlert('Confirm password does not match');
      return false;
    }

    if(this.form.phone == undefined || this.form.phone == ''){
      this.presentToastAlert('Phone is required');
      return false;
    }

    if(this.form.phone.length < 10){
        this.presentToastAlert('Invalid phone number');
        return false;
    }
    
    else
    return true;
  }


}
