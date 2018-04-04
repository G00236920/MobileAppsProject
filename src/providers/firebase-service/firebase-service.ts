import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { AlertController, Nav, NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login'

import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import { Title } from '@angular/platform-browser';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class FirebaseServiceProvider {

  currentUser: string;
  balance: number = 0;
  keyValue: any;

  constructor(public http: HttpModule, public afd: AngularFireDatabase, private alertCtrl: AlertController) {
    
  }

  getUsers(login: string, password: string): any {

    let loginValue = this.afd.database.ref(`users/${login}`).once("value", snapshot => {
      
      this.currentUser = `${login}`;

    }).then(snap =>{
      this.currentUser = `${login}`;
      return snap;
    });

    return loginValue;

  }

  addUser(login: string, password: string, company: string):Promise<any>{

    login = login.toLowerCase();

    let status = this.afd.database.ref(`users/${login}`).once("value", snapshot => {

      if(snapshot.hasChild("password")){

        this.popUp(`This user Already Exists`, "Try Again");

        return snapshot;

      }
      else{

        this.afd.object(`users/${login}`).update({

          password: `${password}`,
          company: `${company}`
        
        });

        this.popUp(`Welcome to your new account`, "Welcome");

        this.currentUser = `${login}`;

        return snapshot;

      }

    });

    return status;

  }

  popUp(text, title) {
    
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['Dismiss']
    });

    alert.present();
  }

  getAccounts(): any {

    let accounts = this.afd.list("users/" +this.currentUser.toLowerCase() +"/accounts").valueChanges();

    return accounts;
  }

  addAccount(newAccount: string, balance: number){

    newAccount = newAccount.toLowerCase();

    this.afd.object("users/" +this.currentUser.toLowerCase() +"/accounts/" +`${newAccount}`).update({

      title: `${newAccount}`,
      balance: +balance
    
    });

  }

  checkAccounts(): Promise<any>{

    let accounts = this.afd.database.ref("users/" +this.currentUser.toLowerCase() +"/accounts").once("value", snapshot => {

    }).then(snap =>{

      return snap;
    });

    return accounts;

  }

  getDetails(account: string, state: string): any {

    let items = this.afd.list("users/" +this.currentUser.toLowerCase() +"/accounts/"+account+"/"+state).valueChanges();

    return items;

  }

  credit(debitAccount: string, amount: number, creditAccount: string, title: string){

    let newItem = {
      title: title,
      amount: amount,
      debitedTo: debitAccount
    };

    var newRef = this.afd.list('/users/'+this.currentUser +"/accounts/" +creditAccount +"/credited").push(newItem).then(snap =>{
      
      this.debit(debitAccount,amount,creditAccount, title, snap.key);

      this.getBalance(creditAccount).then(snap=>{

        var currentBalance: number = parseFloat(snap.child("balance").val());

        var newBalance = currentBalance +(+amount);
        
        this.afd.object('/users/'+this.currentUser +"/accounts/" +creditAccount).update({
          
          balance: newBalance

        });
  
      });

    });

    return this.keyValue;

  }

  debit(debitAccount: string, amount: number, creditAccount: string, title: string, key: string){

    let newItem = {
      title: title,
      amount: amount,
      creditedFrom: creditAccount
    };

    amount = 0-amount;

    this.afd.object('/users/'+this.currentUser +"/accounts/" +debitAccount +"/debited/"+key).update(newItem);

    this.getBalance(creditAccount).then(snap=>{

      var currentBalance: number = parseFloat(snap.child("balance").val());

      var newBalance = -currentBalance +(+amount);
      
      this.afd.object('/users/'+this.currentUser +"/accounts/" +debitAccount).update({
        
        balance: newBalance

      });

    });
    
  }

  getBalance(title: string):Promise<any>{

    let account = this.afd.database.ref("users/" +this.currentUser.toLowerCase() +"/accounts/"+title).once("value", snapshot => {

    }).then(snap =>{

      return snap;
    });

    return account;
  }   

}
