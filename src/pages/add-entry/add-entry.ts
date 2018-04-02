import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { TitleProvider } from '../../providers/title/title';

/**
 * Generated class for the AddEntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-entry',
  templateUrl: 'add-entry.html',
})
export class AddEntryPage {

  accounts: any;
  currentAccount: any;
  debitedAccount: string = "";
  creditAmmount: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afd: FirebaseServiceProvider, public titleName: TitleProvider) {

    this.currentAccount = this.titleName.getAccount();
    this.accounts = this.afd.getAccounts();

  }

  addEntry(){

    if(this.currentAccount == this.debitedAccount){

      this.afd.popUp("You cannot Debit and Credit the same account", "error");

    }
    else if(this.debitedAccount.length == 0){

      this.afd.popUp("You must choose an account to Debit", "error");

    }
    else{

      this.creditAccount();
      this.debitAccount();

    }

  }

  debitAccount(){

    this.afd.debit(this.debitedAccount, this.creditAmmount);

  }

  creditAccount(){

    this.afd.credit(this.debitedAccount, this.creditAmmount);

  }

}
