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

  private userLogin: string;
  private userPassword: string;
  private password1: string;
  private password2: string = "";
  private companyName: string = "";
  private newUser: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afd: FirebaseServiceProvider) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad LoginPage');

  }

  openReg() {
    this.showLogin = false;
    this.showReg = true;
  }

  VerifyUser() {


    if (this.userLogin != null && this.userPassword != null) {

      let test = this.afd.getUsers(this.userLogin, this.userPassword).then(loginData => {

        if (this.userPassword.valueOf() == loginData.child("password").val()) {


          this.navCtrl.push(TabsPage);

        }
        else {

          this.afd.popUp(`Username or Password is incorrect`, "Try Again");

        }

      });

    }

  }

  createUser() {

    if(this.password2.length < 8){
      this.afd.popUp(`Passwords must be 8 or more characters`, "Try Again");
    }
    else if((this.password1 == this.password2) && this.newUser != null && this.password1 != null){

      this.afd.addUser(this.newUser, this.password1, this.companyName).then( snapshot => {

          if(snapshot.child("password").val() == null){
            
            
          this.navCtrl.setRoot(TabsPage);
          this.navCtrl.popToRoot();

          }

      });

    }
    else {

      this.afd.popUp(`Passwords do not match`, "Try Again");
      
    }

  }

  goBack() {
    this.showLogin = true;
    this.showReg = false;
  }

}
