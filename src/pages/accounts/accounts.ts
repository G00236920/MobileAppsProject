import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';


@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html'
})
export class AccountsPage {

  accounts: any;
  currentAccount: any;

  constructor(public navCtrl: NavController, public afd: FirebaseServiceProvider) {

  }

  ngOnInit(){
    
    this.accounts = this.afd.getAccounts();
    
  }

  accountEdit(account: string){

    console.log( account );
  }

}
