import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';

import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {


  constructor(public http: HttpModule, public afd: AngularFireDatabase, private alertCtrl: AlertController) {

  }

  getUsers(login: string, password: string){

    this.afd.database.ref(`users/${login}`).once("value", snapshot => {

      snapshot.key;
      snapshot.child("password").val();

      if(password.valueOf() == snapshot.child("password").val()){

        this.invalidLogin(`${login} Your Password is ${password}`, "Logged in");

      }
      else{

        this.invalidLogin(`Email or Password is incorrect`, "Try Again");

      }

    }).then(snapshot => {

      return snapshot.key;

    });

  }

  addUser(login: string, password: string){

    this.afd.object(`users/${login}`).update({

      password: `${password}`
    
    });

  }

  invalidLogin(text, title) {
    
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['Dismiss']
    });

    alert.present();
  }

}
