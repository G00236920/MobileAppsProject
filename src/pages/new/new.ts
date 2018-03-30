import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-new',
  templateUrl: 'new.html'
})
export class NewPage {

  accountName: string;
  balance: string;

  constructor(public navCtrl: NavController, public afd: FirebaseServiceProvider) {


  }

  addAccount(){

    console.log("Pressed");
    this.afd.addAccount(this.accountName, this.balance);

    this.navCtrl.push(TabsPage);

    this.afd.popUp(`Account Added`, "New Account");

  }

}
