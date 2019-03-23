import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { NativeStorage } from '@ionic-native/native-storage';
import { Platform } from 'ionic-angular';

@Injectable()
export class Auth {

	public fireAuth : any;
  public UserList:any;
  avatar: any = "assets/images/person.png";
  customerId: any;
  profile: any;
  lat: any;
  lng: any;
  isLoggedIn: boolean = false;
  role: any;
  
  constructor(public platform: Platform, private nativeStorage: NativeStorage) {

    platform.ready().then(() => {
        this.fireAuth = firebase.auth(); 
        this.UserList = firebase.database().ref('/UserList');
        console.log(this.UserList);
    });
  }

  login(email: String, password: String){
  	return this.fireAuth.signInWithEmailAndPassword(email,password);
  }

  register(firstname: String, lastname:String, email: String, password: String, phone: String){
  	return this.fireAuth.createUserWithEmailAndPassword(email, password)
  	.then((newUser) =>{
  		this.UserList.child(newUser.user.uid).set({
        base64Image: '',
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        role: 'User',
        });

      this.nativeStorage.setItem('login', {email: email, password: password})
        .then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
      );


  	});
  }

  saveCustomer(base64Image: String, firstname: String, lastname:String, phone: String){
    return this.UserList.child(this.customerId).update({
        base64Image: base64Image,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
    });
  }

  getUserProfile(id){
    return this.UserList.child(id);
  }

  logoutUser(): any{
    return this.fireAuth.signOut();
  }


}
