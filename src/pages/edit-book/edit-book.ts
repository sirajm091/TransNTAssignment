import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { BookServiceProvider } from '../../providers/book-service';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-edit-book',
  templateUrl: 'edit-book.html',
})
export class EditBookPage {
  
  editDetails: any;
  tabBarElement: any;
  max_date: any;
  disableSubmit: boolean = false;

  constructor(public navCtrl: NavController, private camera: Camera, public navParams: NavParams, public service: BookServiceProvider, public toastCtrl: ToastController) {
  	this.editDetails = navParams.data;
  	this.tabBarElement = document.querySelector(".tabbar")['style'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditBookPage');
  }

  ionViewDidEnter(){
  	this.max_date = new Date().toISOString();
  	this.editDetails.added_date = this.max_date;
  	if (document.querySelector(".tabbar")) this.tabBarElement.display = 'none';
  }

  ionViewWillLeave() {
     if (document.querySelector(".tabbar")) this.tabBarElement.display = 'flex';
  }

  addBook(){
	if(this.validateForm()){
		this.disableSubmit = true;
		this.service.addBook(this.editDetails.image, this.editDetails.category, this.editDetails.bookname, this.editDetails.author, this.editDetails.isbn, this.editDetails.publishDate, this.editDetails.addedDate)
			.then((results) => this.handleResults(results));
	}
  }

  handleResults(results){
  	this.navCtrl.pop();
  	this.disableSubmit = false;
  	this.presentToastAlert("Book has been updated");
  }

   presentToastAlert(alert) {
      let toast = this.toastCtrl.create({
          message: alert,
          duration: 2000,
           position: 'top'
      });
      toast.present();
  }


  validateForm(){
    
    if(this.editDetails.image == undefined || this.editDetails.image == ''){
      this.presentToastAlert('Image is required');
      return false;
    }

    if(this.editDetails.category == undefined || this.editDetails.category == ''){
      this.presentToastAlert('Category is required');
      return false;
    }

    if(this.editDetails.bookname == undefined || this.editDetails.bookname == ''){
      this.presentToastAlert('Book name is required');
      return false;
    }

    if(this.editDetails.author == undefined || this.editDetails.author == ''){
      this.presentToastAlert('Author is required');
      return false;
    }

    if(this.editDetails.isbn == undefined || this.editDetails.isbn == ''){
      this.presentToastAlert('ISBN is required');
      return false;
    }

    if(this.editDetails.publishDate == undefined || this.editDetails.publishDate == ''){
      this.presentToastAlert('Publish date is required');
      return false;
    }

    else
    return true;
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
       this.editDetails.base64Image = '';
       this.editDetails.base64Image ='data:image/jpeg;base64,' + imageData;
      }, (err) => {
       // Handle error
      });
  }

}
