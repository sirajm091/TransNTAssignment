import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import  firebase from 'firebase';
import { Auth } from '../../../providers/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  currentUser: any;
  errorMessage: any;
  user: any;
  lan: any = {};
  loading: any;
  disableSave: boolean = false;

  constructor(private camera: Camera, public toastCtrl: ToastController, public nav: NavController, public params: NavParams, public auth: Auth ) {
  	this.user = {};
    this.currentUser = firebase.auth().currentUser;
    this.auth.customerId = this.currentUser.uid;
    this.user = params.data;
    this.user.state = 'Karnataka';
    this.user.country = 'India';
  }

  saveAddress(){
    if(this.validateUser()){
      this.disableSave = true;

      this.auth.saveCustomer(this.user.base64Image, this.user.firstname, this.user.lastname, this.user.phone)
      .then(() =>{
      this.disableSave = false;

        this.nav.pop();
      }).catch(err => {
          this.disableSave = false;

        this.handleError(err);
        });
    }
  }

  handleError(err){
    this.disableSave = false;

    if(err.code){
        this.presentToastAlert(err.message);
    }
  }

  photo(){
     const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64 (DATA_URL):
       this.user.base64Image = '';
       this.user.base64Image ='data:image/jpeg;base64,' + imageData;
      }, (err) => {
       // Handle error
      });
  }

  dismiss(){
    this.nav.pop();
  }

  validateUser(){

    /*if(this.user.base64Image == undefined || this.user.base64Image == ''){
      this.presentToastAlert('Photo is required');
      return false;
    }*/
  
    if(this.user.firstname == undefined || this.user.firstname == ''){
      this.presentToastAlert('Firstname is required');
      return false;
    }

    if(this.user.lastname == undefined || this.user.lastname == ''){
      this.presentToastAlert('Lastname is required');
      return false;
    }

    if(this.user.phone == undefined || this.user.phone == ''){
      this.presentToastAlert('Phone is required');
      return false;
    }

    if(this.user.phone.length < 10){
      this.presentToastAlert('Invalid phone number');
      return false;
    }

    else
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

}
