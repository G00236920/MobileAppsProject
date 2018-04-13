import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireList } from 'angularfire2/database';
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

  //for collecting the users in the firebase db
  users: AngularFireList<any>;

  //for switching panel types
  showLogin = true;
  showReg = false;

  //variables for login and registration
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


    //if the user name and the password fields are not blank
    if (this.userLogin != null && this.userPassword != null) {

      //connect to firebase, then return the result
      this.afd.getUsers(this.userLogin, this.userPassword).then(loginData => {

        //if the password matches the user password, 
        if (this.userPassword.valueOf() == loginData.child("password").val()) {

          //navigate to the next page
          this.navCtrl.setRoot(TabsPage);
          this.navCtrl.push(TabsPage);

        }
        else {

          //show a pop up if the password or username are incorrect
          this.afd.popUp(`Username or Password is incorrect`, "Try Again");

        }

      });

    }

  }

  createUser() {

    //if the password has less than characters
    if(this.password2.length < 8){

      //show a pop up warning the user to enter more than 8 chars
      this.afd.popUp(`Passwords must be 8 or more characters`, "Try Again");

    }

    //if the two password fields match and are not blank
    else if((this.password1 == this.password2) && this.newUser != null && this.password1 != null){

      //connect to the database, return a snapshot of the data 
      this.afd.addUser(this.newUser, this.password1, this.companyName).then( snapshot => {

          //if the user data contains a password , proving that the user exists 
          if(snapshot.child("password").val() == null){
            
            //navigate to the tabspage
            this.navCtrl.setRoot(TabsPage);
            this.navCtrl.popToRoot();

          }

      });

    }
    else {

      //show popup that the passwords are different
      this.afd.popUp(`Passwords do not match`, "Try Again");
      
    }
  
  }

  goBack() {

    //hide the create user panel
    this.showLogin = true;
    this.showReg = false;
  }

}
