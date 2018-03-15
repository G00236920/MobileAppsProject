import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
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


  showLogin = true;
  showReg = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseServiceProvider: FirebaseServiceProvider ) {
    
    this.firebaseServiceProvider.getUsers();

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad LoginPage');

  }

  openReg(){
    this.showLogin = false;
    this.showReg = true;
  }
  
  VerifyUser(){
    
    this.navCtrl.push(TabsPage);
  }

  createUser(){

  }

  goBack(){
    this.showLogin = true;
    this.showReg = false;
  }

  addUser(){

  }

}
