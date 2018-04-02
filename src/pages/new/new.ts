import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-new',
  templateUrl: 'new.html'
})
export class NewPage {

  accountName: string="";
  balance: number;

  constructor(public navCtrl: NavController, public afd: FirebaseServiceProvider) {

  }

  addAccount(){

    if(this.accountName.length == 0 || this.accountName == " "){

      this.afd.popUp(`You must give the account a name`, "Error");
      
    }
    else if(this.balance == null){

      this.afd.popUp(`You must have a starting balance for an account, It can be set to 0`, "Error");

    }
    else{

      let accounts = this.afd.checkAccounts().then( listOfAccounts =>{

        if(listOfAccounts.child(this.accountName).val() == null){
          
          this.afd.addAccount(this.accountName, this.balance);
    
          this.navCtrl.push(TabsPage);
      
          this.afd.popUp(`Account Added`, "New Account");

        }
        else{
          
          this.afd.popUp(`Account Already Exists`, "Error");

        }

      });
    }

  }

}
