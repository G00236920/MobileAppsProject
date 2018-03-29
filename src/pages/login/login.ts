import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireList } from 'angularfire2/database';
import { DataSnapshot } from '@firebase/database';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  users: AngularFireList<any>;

  showLogin = true;
  showReg = false;

  constructor( public navCtrl: NavController, public navParams: NavParams, public afd: FirebaseServiceProvider ) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad LoginPage');

  }

  openReg(){
    this.showLogin = false;
    this.showReg = true;
  }
  
  VerifyUser(){

    if(this.userEmail != null && this.userPassword !=null){

      let test = this.afd.getUsers(  this.userEmail, this.userPassword).then( loginData => {

        if(this.userPassword.valueOf() == loginData.child("password").val()){

          this.navCtrl.push(TabsPage);

        }
        else{

          this.afd.popUp(`Email or Password is incorrect`, "Try Again");

        }
        
      });

    }

  }

  createUser(newUser){

    this.afd.addUser( 'newUser', 'password');

  }

  goBack(){
    this.showLogin = true;
    this.showReg = false;
  }

  letMeIn(){

  }

}
