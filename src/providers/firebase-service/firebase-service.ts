import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
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

  //store the current user name ane values
  currentUser: string;
  balance: number = 0;
  keyValue: any;
  newBalance: number;

  constructor(public http: HttpModule, public afd: AngularFireDatabase, private alertCtrl: AlertController) {
    
  }

  //gather all the users and return them 
  getUsers(login: string, password: string): any {

    let loginValue = this.afd.database.ref(`users/${login}`).once("value", snapshot => {
      
      this.currentUser = `${login}`;

    }).then(snap =>{
      this.currentUser = `${login}`;
      return snap;
    });

    return loginValue;

  }

  //add a new user
  addUser(login: string, password: string, company: string):Promise<any>{

    //convert the username to lowercase
    login = login.toLowerCase();

    //connect to firebase and check if the username exists with a password
    let status = this.afd.database.ref(`users/${login}`).once("value", snapshot => {

      //if the user has a child called password, then the user already exists
      if(snapshot.hasChild("password")){

        this.popUp(`This user Already Exists`, "Try Again");

        return snapshot;

      }
      else{

        //if the username hasnt been taken already
        this.afd.object(`users/${login}`).update({

          password: `${password}`,
          company: `${company}`
        
        });

        //let the user know the account has been createe
        this.popUp(`Welcome to your new account`, "Welcome");

        //store the current user
        this.currentUser = `${login}`;

        return snapshot;

      }

    });

    //return the status
    return status;

  }

  //popup template
  popUp(text, title) {
    
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['Dismiss']
    });

    //show the popup
    alert.present();
  }

  //get the list of accounts of the current user
  getAccounts(): any {

    let accounts = this.afd.list("users/" +this.currentUser.toLowerCase() +"/accounts").valueChanges();

    //return the axcounts
    return accounts;
  }

  //add the account 
  addAccount(newAccount: string, balance: number){

    //convert the newaxcount name to lower case
    newAccount = newAccount.toLowerCase();

    //connect to firebase and update it with the values needed
    this.afd.object("users/" +this.currentUser.toLowerCase() +"/accounts/" +`${newAccount}`).update({

      title: `${newAccount}`,
      balance: +balance
    
    });

  }

  //check the accounts to see if it exists already
  checkAccounts(): Promise<any>{


    let accounts = this.afd.database.ref("users/" +this.currentUser.toLowerCase() +"/accounts").once("value", snapshot => {

    }).then(snap =>{

      return snap;
    });

    return accounts;

  }

  //gather details of the current user, the current state and the account the user is viewing
  getDetails(account: string, state: string): any {

    let items = this.afd.list("users/" +this.currentUser.toLowerCase() +"/accounts/"+account+"/"+state).valueChanges();

    return items;

  }

  //credit the account
  credit(debitAccount: string, amount: number, creditAccount: string, title: string, imageString: string){

    //info to be added to firebase
    let newItem = {
      title: title,
      amount: amount,
      debitedTo: debitAccount,
      image: imageString
    };

    //connect to the credit state, for the xurrent user and add the values to the account the user is viewing
    this.afd.list('/users/'+this.currentUser +"/accounts/" +creditAccount +"/credited").push(newItem).then(snap =>{
      
      //debit the account the user has requested, using the same info the user has entered on the creited account
      this.debit(debitAccount,amount,creditAccount, title, snap.key, imageString);

      //post the credit info
      this.getBalance(creditAccount).then(snap=>{

        //current balance value
        var currentBalance: number = parseFloat(snap.child("balance").val());

        // add the amount to the current balance
        var newBalance = currentBalance +(+amount);
        
        //post the new balance to the users firebase
        this.afd.object('/users/'+this.currentUser +"/accounts/" +creditAccount).update({
          
          balance: newBalance

        });
  
      });

    });

    //return the key that the entry created, this is so we can delete the entry if needed
    return this.keyValue;

  }

  //debit the account here
  debit(debitAccount: string, amount: number, creditAccount: string, title: string, key: string, image: string){

    //same info as entered for the credited account
    let newItem = {
      title: title,
      amount: amount,
      creditedFrom: creditAccount,
      image: image
    };

    //make the ammount negative, as it is being debited
    amount = 0-amount;

    //update the firebase entry for the debited account
    this.afd.object('/users/'+this.currentUser +"/accounts/" +debitAccount +"/debited/"+key).update(newItem);

    //get the account balance 
    this.getBalance(creditAccount).then(snap=>{

      //get the current balance
      var currentBalance: number = parseFloat(snap.child("balance").val());

      //add the negative value amount to the balance
      this.newBalance = -currentBalance +(+amount);
      
      //update the balance
      this.afd.object('/users/'+this.currentUser +"/accounts/" +debitAccount).update({
        
        balance: this.newBalance

      });

    });
    
  }

  //get the current account balance 
  getBalance(title: string):Promise<any>{

    //connect to firebase and return the balance
    let account = this.afd.database.ref("users/" +this.currentUser.toLowerCase() +"/accounts/"+title).once("value", snapshot => {

    }).then(snap =>{

      return snap;
    });

    return account;
  }   

}
