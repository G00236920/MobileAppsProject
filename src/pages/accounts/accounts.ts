import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AccountDetailsPage } from '../account-details/account-details';
import { TitleProvider } from '../../providers/title/title';

@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html'
})
export class AccountsPage {

  //All accounts
  accounts: any;
  //The account currently being used
  currentAccount: any;

  constructor(public navCtrl: NavController, public afd: FirebaseServiceProvider, private titleName: TitleProvider) {

  }


  ngOnInit(){
    
    //Get all the accounts for the current user
    this.accounts = this.afd.getAccounts();
    
  }


  accountEdit(account: string){

    //set the title of the current account
    this.titleName.setAccount(account);

    //Push the AccountDetailsPage to navigation
    this.navCtrl.push( AccountDetailsPage );

  }

}
