import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BookServiceProvider } from '../../providers/book-service';

@Component({
  selector: 'page-add-book',
  templateUrl: 'add-book.html'
})

export class AddBook {
  form: any = {};
  max_date: any;
  disableSubmit: boolean = false;
  tabBarElement: any;

  constructor(public navCtrl: NavController, private camera: Camera, public service: BookServiceProvider, public toastCtrl: ToastController) {
  	this.tabBarElement = document.querySelector(".tabbar")['style'];
  	//this.form.base64Image = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAUAAA/+4AJkFkb2JlAGTAAAAAAQMAFQQDBgoNAAAEmwAABw0AAAl8AAALpP/bAIQAAgICAgICAgICAgMCAgIDBAMCAgMEBQQEBAQEBQYFBQUFBQUGBgcHCAcHBgkJCgoJCQwMDAwMDAwMDAwMDAwMDAEDAwMFBAUJBgYJDQsJCw0PDg4ODg8PDAwMDAwPDwwMDAwMDA8MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8IAEQgAzgCcAwERAAIRAQMRAf/EAMYAAQEBAQEBAQEBAAAAAAAAAAAGBQcEAQIDCAEBAAAAAAAAAAAAAAAAAAAAABAAAQIFAwMFAQAAAAAAAAAABAADIAECNAVAFSUQMBSQETESEyIRAAAEAQYLBwMFAQAAAAAAAAABAgPBIBExEoIEEEAhQVHhInKi8jMwYTJSEyNzcZEUgdFiU2MkEgEAAAAAAAAAAAAAAAAAAACQEwEAAQMCBAYBBAMAAAAAAAABEQAhMUFRYXGhsRAwQPCBkdFgkMHxIHDh/9oADAMBAAIRAxEAAAH/AFgbAAAAAAAAAI8sCwAAAAAAAABx8sCwAAAAAAAABx8sCwAAAAAAAABx8sCwAAAAAAAABx8sCwAAAAB+T9AAAHHywLAAAAGeYx4i2AAAOPlgWAAB+TCPIaBsmKfo9R7wADj5YFgAAQZYHsBnGMf0PpSgAHHywLAAA58UB9PKaJsgnSiAAOPlgWAABMnsPpsHnPSCdKIAA4+WBYAAEyaYMA0z+BTE6UQABx8sCwAAJk0we0yj+RQE6UQABx8sCwAAJk0waZGFmCdKIAA4+WBYAAEyaYNMxTaBOlEAAcfLAsAACZNMGmACdKIAA4+WBYAAEwagNM/JhHmNc0QADj5YFgAATJ/c+nmPpunpAAAOPlgWAAB8J8/RvH0AAAA4+WBYAAAAAAAAA4+WBYAAAAAAAAA4+WBYAAAAAAAAA4+WBYAAAAAAAAA4+WBYAAAAAAAAA4+WBYAAAAAAAAA4+bBsAAAAAAAAAjz/2gAIAQEAAQUCFF8lbUtqW1LaltS2pbUtqW1LaltS2pbUtqW1LaltS2rpitJitJitJitJiu37yl2cV2XSmGV5RRC/FxovsYqKc5Sk7kGaF9TyU0AO10LYrrTJrTlDJDT84sVFdGtMNM9XimGV5JZKbx1PuFKVL8WKi/Ct15k9upOZBqmf0PJTQI7XUO5ixUQNwc23UwC3RSP8KTzNU+gdzFiogbgy2Dtp+5xVeOHnTjnq65IO5ixUQNwZbB21LdFMyypMUgDVM0oO5ixUQNwZbB2yDl+5XQO5ixUQNwZbB2yFL8mroHcxYqIG4Mtg7aAO5ixUQf8AJRlsHbKc5Sk5kGqZ/Q4lDjNjyixURdFbLrz7b4bD7TIvmvPKQLjs22WmpdjFRu45lxNY5htfHbxWkxWkxWkxWkxWkxWkF8tcsuWXLLllyy5ZcsuWXLLllyy5ZcsuWXLLllyy5bp//9oACAECAAEFAvQI/9oACAEDAAEFAvQI/9oACAECAgY/AgI//9oACAEDAgY/AgI//9oACAEBAQY/Al7dSpNmnpHX4dY6/DrHX4dY6/DrHX4dY6/DrHX4dY6/DrHX4dY6/DrHX4dY6/DrHX4dY6/DrHX4dY6/DrHX4dY6/DrwP2Y4o/Zjij9mOKP2Y4o/Zj2eU6aOxfsx7HbXl8pUia7M1E/2qF1N131VrPL3di/ZjKnM5i0iq3O8vMSRtH+M2ebOJ6vqK8ysCHWT91nKktIM1mTS0dRJhZNnPUmnP6y37MZTjT7qqpKVUT9DoHtoJPfnw7a9ryFlMf8AM16aP7VCveFm8s6dAvqUlMRKKYvvLfsxlXxbR+6y7On7mKj3sulkOegVWiN5ehNA21fjN+UqRPVrq8ysN+3yjLfsxlX/AOSKg4s0EaklkVnDaiSRKUW0oZcgmS6gz0EZYb9vlGW/ZjKv/wAkVB7dDO6FIUoyZazEDJCaisypzC2lnObfhPBft8oy37MZV/8AkioPboZ3QZpQlJnSZEKqcrqvCWjvBrX43M2gsF+3yjLfsxlX/wCSKg9uhndwPPLy1PDDDft8oy37MZV/+SKg9uhndwLT6dSp3z4b9vlGW/ZjKv8A8kVB7dDO7Jv2+UZb9mMq+oOk1Vi+k5/uHt0M7uCczmLSKrRG+vQkbavxm/KVIOpOZq8Sjlv2Yyk3xop6uR1PcHlNqn2cpZyDPqLJOzRnFW6MGf8AoqgVr28a/wCCaBM2gk9i/ZjLnR7Rnoo+wnV7qu+j7CYshdm/Zjij9mOKP2Y4o/Zjij9mOKP2Y4ov8Xur0fpSOQcg5ByDkHIOQcg5ByDkHIOQcg5ByDkHJg//2gAIAQEDAT8h/P8AF3E2/V//AP8A/wD/AP8A/wD/AP8A/wD/AP8A7AgJRLV9F8zH876FatPt270qUiq8Q0J8/wBEIMqxSkKrYE8/xWn9N09+1RC+W9MeFrxXQ8FWm4LiHhNKiOJgyxPLzfCwjibf8FBRvma5rfxlQEf0mnzWFLe29u9LbAk4l3aOwfDQnzfkI0D3meONqMNENsuenzU+isfyPxWl0+B3+2o37N6Y8fZN/O+BKaLFZ81ILDBd+aUEoBlamFeEnv4+yb+g+AzXXD40MdWm4Q5i/EVpy0WTMYj48PZN/QfAZsGNYF5xWNT/ACFWD4/zOPh7Jv6H4DMN81IdFY+gePsm/ofgM2iAmc1+R4+yb+k+Azeyb+b9YbHPY0f4MyIQZVipJBjH9/itFtzZ360KqDmysf35v2jlxW76oIH9iFNemNTkZpSgcYR/HWgyTJaHvgVEk6pl5ufP/Nm45KeWc7OiKFLX3PugAABgP9B//wD/AP7p6/y+kVVVVVV//9oACAECAwE/If2CP//aAAgBAwMBPyH9gj//2gAMAwEAAhEDEQAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAABAAAAAAAIAJJAAAAAABABIAAAAAAAIIAAAAAAAJIAAAAAAAAJJIAAAAAAAJIIAAAAAAAJIIAAAAAAAJIAAAAAAAAJIAAAAAAAAJIJIAAAAAABIAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQMBPxD3874cfq/mZmZmZmZmZmZmZmMFGAQSaE5fRYSAnH/LPmKmKrazjcnpKOh9ErC6sX2OXn4IR5aAbq2KlsaDv2Ws/Br7KCLiB+YvJTKwXYDO5ivuLxoAACAsBV71DBBhbtbW3xRQSwbWWxIumTFXT+prgwLE5t5uDBnfDmADYsbxLFS+EQBA5pffiPzMB2R3Cpm0UGHUR9ApDTtVbif5DlRqCOgAADzcXA2FhCAm0EJPKp8Uwygyy6cN2p4GhkTtaz8GsncdGtwdGQOVMWNe1fuRh9TxoIsWDB55XOj1IausSCYy+KC94AnVzlTzNJAHNaFZCKOQJ9AVzo9XXO5XTO7QXjxaLKfO5LgrC2xtWIIjrBUrgCplVN1kW58PPK50errncrpndrc3E+zcBb71bzaW8G32YNamZAl5CUOJMu3nlc6PV1zuV0zu+A7avQlY5Q9AVzo9XXO5XTO74aLbuiERa9AVzo9XXO5XTO76IrmtzrrIn6q653K6Z3fA4jy0A3VsVPHyEZu1rPwaz8lyyN4flI5UjjVIGcWICJac/NxlMA2xEom2C6QNX8BnsklshzxSNNKrIS4ZX1WckhSOUg4T8KMfmS5KYA4wc6sKyA/cyvl8/EAgAhLiNT26gBZ4ojkIVttFxLgbfZo+IwYADQD/AEHmZmZ7q+7h8+k//wD/AP8A/wD/2gAIAQIDAT8Q/YI//9oACAEDAwE/EP2CP//Z';
  }

  ionViewDidEnter(){
  	this.max_date = new Date().toISOString();
  	this.form.added_date = this.max_date;
  	if (document.querySelector(".tabbar")) this.tabBarElement.display = 'none';
  }

  ionViewWillLeave() {
     if (document.querySelector(".tabbar")) this.tabBarElement.display = 'flex';
  }

  addBook(){
	if(this.validateForm()){
		this.disableSubmit = true;
		this.service.addBook(this.form.base64Image, this.form.category, this.form.book_name, this.form.author, this.form.isbn, this.form.publish, this.form.added_date)
			.then((results) => this.handleResults(results));
	}
  }

  handleResults(results){
  	this.navCtrl.pop();
  	this.disableSubmit = false;
  	this.presentToastAlert("Book has been added");
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
    
    if(this.form.base64Image == undefined || this.form.base64Image == ''){
      this.form.base64Image = 'data:image/jpeg;base64,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';
    }

    if(this.form.category == undefined || this.form.category == ''){
      this.presentToastAlert('Category is required');
      return false;
    }

    if(this.form.book_name == undefined || this.form.book_name == ''){
      this.presentToastAlert('Book name is required');
      return false;
    }

    if(this.form.author == undefined || this.form.author == ''){
      this.presentToastAlert('Author is required');
      return false;
    }

    if(this.form.isbn == undefined || this.form.isbn == ''){
      this.presentToastAlert('ISBN is required');
      return false;
    }

    if(this.form.publish == undefined || this.form.publish == ''){
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
       this.form.base64Image = '';
       this.form.base64Image ='data:image/jpeg;base64,' + imageData;
      }, (err) => {
       // Handle error
      });
  }

}
