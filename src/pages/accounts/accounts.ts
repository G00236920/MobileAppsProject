import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AccountDetailsPage } from '../account-details/account-details'
import { TitleProvider } from '../../providers/title/title'

@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html'
})
export class AccountsPage {

  accounts: any;
  currentAccount: any;

  constructor(public navCtrl: NavController, public afd: FirebaseServiceProvider, private titleName: TitleProvider) {

  }

  ngOnInit(){
    
    this.accounts = this.afd.getAccounts();
    
  }

  accountEdit(account: string){

    this.titleName.setAccount(account);
    this.navCtrl.push( AccountDetailsPage );

  }

}
