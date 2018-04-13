import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-new',
  templateUrl: 'new.html'
})
export class NewPage {

  //variables to store the account name and balance
  accountName: string="";
  balance: number;

  constructor(public navCtrl: NavController, public afd: FirebaseServiceProvider) {

  }

  addAccount(){

    //if the account name is blank 
    if(this.accountName.length == 0 || this.accountName == " "){

      //show the pop up to ask the user to enter the account name
      this.afd.popUp(`You must give the account a name`, "Error");
      
    }
    else if(this.balance == null){

      //pop up informing the user to enter a starting balance
      this.afd.popUp(`You must have a starting balance for an account, It can be set to 0`, "Error");

    }
    else{

      //get all the accounts for the user in the database
      this.afd.checkAccounts().then( listOfAccounts =>{

        //if the account name has not been found 
        if(listOfAccounts.child(this.accountName.toLowerCase()).val() == null){
          
          //add the account to the users fb
          this.afd.addAccount(this.accountName, this.balance);

          //navigate back to the tabs page
          this.navCtrl.setRoot(TabsPage);
          this.navCtrl.popToRoot();
      
          //pop up to tell the user the account has been entered
          this.afd.popUp(`Account Added`, "New Account");

        }
        else{
          
          //pop up and tell the user the account already exists
          this.afd.popUp(`Account Already Exists`, "Error");

        }

      });
    }

  }

}
