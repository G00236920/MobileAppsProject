import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';
import { AngularFireList } from 'angularfire2/database';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public afd: FirebaseServiceProvider , private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad LoginPage');

  }

  openReg(){
    this.showLogin = false;
    this.showReg = true;
  }
  
  async VerifyUser(){

   await console.log( await this.afd.getUsers('test','test') );

  }

  createUser(newUser){

    console.log( this.afd.addUser('user', 'password') +" q");

  }

  goBack(){
    this.showLogin = true;
    this.showReg = false;
  }

  addUser(){

  }

  invalidLogin(text, title) {
    
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['Dismiss']
    });

    alert.present();
  }

  login(){

    
  }

}
