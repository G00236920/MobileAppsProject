import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';

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


  constructor(public http: HttpModule, public afd: AngularFireDatabase) {

  }

  getUsers(login: string, password: string){

    this.afd.database.ref(`users/${login}`).once("value", snapshot => {

      snapshot.key;
      snapshot.child("password").val();

    }).then(snapshot => {

      return snapshot.key;
      
    });

  }

  addUser(login: string, password: string){

    this.afd.object(`users/${login}`).update({

      password: `${password}`
    
    });

  }

}
