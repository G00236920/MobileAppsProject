import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { AlertController, Nav, NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login'

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

  getUsers(login: string, password: string): Promise<any> {

    let loginValue = this.afd.database.ref(`users/${login}`).once("value", snapshot => {
      
       return snapshot;

    });

    return loginValue;

  }

  addUser(login: string, password: string){

    this.afd.database.ref(`users/${login}`).once("value", snapshot => {

      if(snapshot.hasChild("password")){

        this.popUp(`This user Already Exists`, "Try Again");

      }
      else{

        this.afd.object(`users/${login}`).update({

          password: `${password}`
        
        });

        this.popUp(`Welcome to your new account`, "Welcome");

      }

    });

  }

  popUp(text, title) {
    
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['Dismiss']
    });

    alert.present();
  }

}
